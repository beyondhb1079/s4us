#!/bin/bash

# Usage: bash scripts/watchdog-sync.sh 1492 1493 1494

PRS=("$@")

if [ ${#PRS[@]} -eq 0 ]; then
    echo "❌ Error: Please provide at least one PR number."
    exit 1
fi

echo "🐕 Starting Guardian Watchdog for PRs: ${PRS[*]}"

# Get the initial commit hash of main
git fetch origin main -q
CURRENT_MAIN=$(git rev-parse origin/main)

CONSECUTIVE_GREEN_COUNT=0

while true; do
    ALL_GREEN=true
    ALL_MERGED=true
    
    # Check if main has moved
    git fetch origin main -q
    NEW_MAIN=$(git rev-parse origin/main)
    
    if [ "$CURRENT_MAIN" != "$NEW_MAIN" ]; then
        echo "⚠️  Alert: origin/main has moved! Re-syncing all active PRs..."
        CURRENT_MAIN=$NEW_MAIN
        CONSECUTIVE_GREEN_COUNT=0
        
        for PR in "${PRS[@]}"; do
            PR_STATE=$(gh pr view "$PR" --json state -q .state 2>/dev/null || echo "UNKNOWN")
            if [ "$PR_STATE" == "MERGED" ] || [ "$PR_STATE" == "CLOSED" ]; then
                echo "⏭️  Skipping PR #$PR since it is already $PR_STATE."
                continue
            fi
            
            BRANCH=$(gh pr view "$PR" --json headRefName -q .headRefName)
            echo "🔄 Syncing $BRANCH with new main..."
            git checkout "$BRANCH" -q
            
            # Attempt the merge and catch conflicts
            if ! git merge origin/main --no-edit; then
                echo "⚠️ CONFLICT DETECTED in PR #$PR ($BRANCH)!"
                
                # Check which files are conflicting
                CONFLICTED_FILES=$(git diff --name-only --diff-filter=U)
                
                # If yarn.lock is the ONLY conflicting file, auto-resolve it
                if [ "$CONFLICTED_FILES" == "yarn.lock" ]; then
                    echo "🔧 Conflict is strictly in yarn.lock. Auto-resolving..."
                    git checkout --ours yarn.lock
                    yarn install --ignore-engines
                    git add yarn.lock
                    git commit --no-edit
                    echo "✅ yarn.lock conflict cleanly resolved and merged."
                else
                    echo "🛑 Complex conflicts detected in: $CONFLICTED_FILES"
                    echo "🛑 Aborting merge to prevent repository corruption..."
                    git merge --abort
                    echo "❌ Watchdog halting. Guardian intervention required to resolve code conflicts."
                    exit 1
                fi
            fi
            
            git push origin "$BRANCH"
            ALL_GREEN=false # We just pushed, so we must wait for new checks
        done
        echo "⏳ Sync complete. Waiting 30 seconds for CI to trigger..."
        sleep 30
        continue
    fi

    # Poll the PR checks
    for PR in "${PRS[@]}"; do
        PR_STATE=$(gh pr view "$PR" --json state -q .state 2>/dev/null || echo "UNKNOWN")
        if [ "$PR_STATE" == "MERGED" ] || [ "$PR_STATE" == "CLOSED" ]; then
            echo "✅ PR #$PR is $PR_STATE. Ignoring checks."
            continue
        fi
        
        # If we reach here, at least one PR is still active
        ALL_MERGED=false
        
        STATUS=$(gh pr checks "$PR" --json state -q '.[0].state' 2>/dev/null || echo "PENDING")
        
        if [ "$STATUS" == "FAILURE" ]; then
            echo "❌ CRITICAL: PR #$PR has failed its checks!"
            echo "🛑 Watchdog halting. Guardian intervention required."
            exit 1
        elif [ "$STATUS" == "PENDING" ] || [ "$STATUS" == "IN_PROGRESS" ]; then
            echo "⏳ PR #$PR is still running checks..."
            ALL_GREEN=false
        elif [ "$STATUS" == "SUCCESS" ]; then
            echo "✅ PR #$PR is GREEN."
        fi
    done

    if [ "$ALL_MERGED" = true ]; then
        echo "🎉 All monitored PRs have been merged! Guardian watchdog exiting gracefully."
        exit 0
    fi

    if [ "$ALL_GREEN" = true ]; then
        CONSECUTIVE_GREEN_COUNT=$((CONSECUTIVE_GREEN_COUNT + 1))
        echo "🎉 All PRs are currently Green. (Consecutive count: $CONSECUTIVE_GREEN_COUNT/5)"
        
        if [ "$CONSECUTIVE_GREEN_COUNT" -ge 5 ]; then
            echo "🛑 Reached 5 consecutive GREEN hits. Exiting watchdog to prevent indefinite polling."
            exit 0
        fi
    else
        CONSECUTIVE_GREEN_COUNT=0
    fi

    echo "💤 Sleeping for 60 seconds before next poll..."
    sleep 60
done
