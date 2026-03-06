#!/bin/bash

# Usage: bash scripts/watchdog-sync.sh 1492 1493 1494

PRS=("$@")

if [ ${#PRS[@]} -eq 0 ]; then
    echo "❌ Error: Please provide at least one PR number."
    exit 1
fi

echo "🐕 Starting Guardian Watchdog for PRs: ${PRS[*]}"

CONSECUTIVE_GREEN_COUNT=0

while true; do
    ACTIVE_PRS=()
    ALL_GREEN=true
    
    # Ensure our local main is fresh
    git fetch origin main -q
    MAIN_REF=$(git rev-parse origin/main)
    
    for PR in "${PRS[@]}"; do
        # 1. Check if PR is still active
        PR_STATE=$(gh pr view "$PR" --json state -q .state 2>/dev/null || echo "UNKNOWN")
        if [ "$PR_STATE" == "MERGED" ] || [ "$PR_STATE" == "CLOSED" ]; then
            echo "✅ PR #$PR is $PR_STATE. Removing from watch list."
            continue
        fi
        
        # PR is active, keep it in the list for next iteration
        ACTIVE_PRS+=("$PR")
        BRANCH=$(gh pr view "$PR" --json headRefName -q .headRefName)

        # 2. Check sync status: is origin/main an ancestor of the branch?
        if ! git merge-base --is-ancestor "$MAIN_REF" "origin/$BRANCH" 2>/dev/null; then
            echo "🔄 PR #$PR ($BRANCH) is BEHIND main. Syncing..."
            git checkout "$BRANCH" -q
            git pull origin "$BRANCH" --no-edit -q || true
            
            if ! git merge origin/main --no-edit; then
                echo "⚠️ CONFLICT DETECTED in PR #$PR ($BRANCH)!"
                CONFLICTED_FILES=$(git diff --name-only --diff-filter=U)
                if [ "$CONFLICTED_FILES" == "yarn.lock" ]; then
                    echo "🔧 Auto-resolving yarn.lock..."
                    git checkout --ours yarn.lock
                    yarn install --ignore-engines
                    git add yarn.lock
                    git commit -m "chore: resolve yarn.lock conflict [skip ci]"
                else
                    echo "🛑 Complex conflicts in: $CONFLICTED_FILES. Aborting."
                    git merge --abort
                    exit 1
                fi
            fi
            git push origin "$BRANCH"
            ALL_GREEN=false
            CONSECUTIVE_GREEN_COUNT=0
            # Since we pushed, we should wait for CI to pick up the new commit
            continue 
        fi

        # 3. Check CI Status
        STATUS=$(gh pr checks "$PR" --json state -q '.[0].state' 2>/dev/null || echo "PENDING")
        
        if [ "$STATUS" == "FAILURE" ]; then
            echo "❌ CRITICAL: PR #$PR has failed its checks!"
            echo "🛑 Watchdog halting. Guardian intervention required."
            exit 1
        elif [ "$STATUS" == "PENDING" ] || [ "$STATUS" == "IN_PROGRESS" ] || [ "$STATUS" == "QUEUED" ]; then
            echo "⏳ PR #$PR is still running checks ($STATUS)..."
            ALL_GREEN=false
        elif [ "$STATUS" == "SUCCESS" ]; then
            echo "✅ PR #$PR is GREEN and synced."
        else
            echo "❓ PR #$PR status is $STATUS."
            ALL_GREEN=false
        fi
    done
    
    # Update the watch list
    PRS=("${ACTIVE_PRS[@]}")

    # 4. Exit conditions
    if [ ${#PRS[@]} -eq 0 ]; then
        echo "🎉 All monitored PRs have been merged! Guardian watchdog exiting gracefully."
        exit 0
    fi

    if [ "$ALL_GREEN" = true ]; then
        CONSECUTIVE_GREEN_COUNT=$((CONSECUTIVE_GREEN_COUNT + 1))
        echo "🎉 All PRs are currently Green. (Consecutive count: $CONSECUTIVE_GREEN_COUNT/5)"
        
        if [ "$CONSECUTIVE_GREEN_COUNT" -ge 5 ]; then
            echo "🛑 Reached 5 consecutive GREEN hits. Exiting watchdog."
            exit 0
        fi
    else
        CONSECUTIVE_GREEN_COUNT=0
    fi

    echo "💤 Sleeping for 60 seconds before next poll..."
    sleep 60
done
