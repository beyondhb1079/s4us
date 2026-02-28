### Cross-Agent Sync Rule (The Safe Sync Protocol)

Within an Epic branch, agents are permitted to commit and push directly to the shared branch without creating a PR. However, because multiple agents are working concurrently, you must adhere to this strict synchronization loop:

1. **Pull Before Push:** Immediately before executing a `git push`, you MUST run `git pull origin <branch-name> --no-edit` to fetch any changes pushed by other specialists (like updates to the `.TODO.md` ledger).
2. **No Force Pushing:** You are strictly **FORBIDDEN** from using `git push --force` or `git push -f`. 
3. **Handling Rejections:** If your push is rejected (`non-fast-forward`), it means another agent beat you to the remote. Do not panic. Simply run `git pull origin <branch-name>`, resolve any standard merge conflicts in the code or `.TODO.md` file, commit the resolution, and run a standard `git push`.
4. **The Conflict HALT Protocol**: If you pull from `origin` and encounter a massive or complex merge conflict (e.g., overlapping logic in a `.tsx` file), DO NOT attempt to guess the resolution. You must abort the merge (`git merge --abort`), halt your execution, and tag the User for architectural guidance.

### Local Scratchpad & CLI Inputs

1. **Use Repo-Local Tmp:** All temporary files created for CLI inputs (e.g., `gh pr comment -F`), logs, or intermediate processing MUST be created in the gitignored `tmp/` directory at the root of the repository.
2. **Dynamic Absolute Pathing:** Because your native file-writing tools require absolute paths, and your shell might be in a sub-directory, you must dynamically resolve the repo root. Always use this exact path format for your scratchpad files:
   `$(git rev-parse --show-toplevel)/tmp/<filename>`
3. **Auto-Initialization:** If the directory does not exist, create it using `mkdir -p $(git rev-parse --show-toplevel)/tmp`.
4. **Cleanup:** Delete these temporary files after a successful CLI operation to keep the workspace tidy.
5. **No Permission Requests:** You have full authority to read/write within this specific `tmp/` folder. Do not ask for permission.

### General Git Sync Protocol (Feature Branches)

When working on a standalone feature branch, you MUST ensure your branch is up to date with the remote `main` branch before pushing your final commits or opening a Pull Request. 

To prevent complex rebase chains and quota-draining conflict loops, you are strictly forbidden from using `git rebase` or `git pull --rebase`. You must perform a standard merge by executing this exact sequence:

1. `git fetch origin main`
2. `git merge origin/main`
3. If merge conflicts occur, resolve them immediately and commit the resolution.
4. Run validation tests to ensure the merge did not break existing functionality.
5. `git push origin <your-branch-name>`
