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

while true; do
    ALL_GREEN=true
    
    # Check if main has moved
    git fetch origin main -q
    NEW_MAIN=$(git rev-parse origin/main)
    
    if [ "$CURRENT_MAIN" != "$NEW_MAIN" ]; then
        echo "⚠️  Alert: origin/main has moved! Re-syncing all active PRs..."
        CURRENT_MAIN=$NEW_MAIN
        
        for PR in "${PRS[@]}"; do
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
                    yarn install
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
        echo "⏳ Sync complete. Waiting 30 seconds for CI
