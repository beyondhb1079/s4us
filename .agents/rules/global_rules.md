### Cross-Agent Sync Rule

Within an Epic branch, agents are permitted to commit and push directly to the shared branch without creating a PR. When completing a task, you must update the `.TODO.md` and commit the change so the Orchestrator and other specialists see it immediately upon their next `git pull`.

### Local Scratchpad & CLI Inputs

1. **Use Repo-Local Tmp:** All temporary files created for CLI inputs (e.g., `gh pr comment -F`), logs, or intermediate processing MUST be created in the `./tmp/` directory at the root of the repository.
2. **Auto-Initialization:** If the `./tmp/` directory does not exist, you are authorized to create it immediately using `mkdir -p ./tmp/`.
3. **Cleanup:** While these files are gitignored, you should aim to delete them after a successful CLI operation to keep the workspace tidy.
4. **No Permission Requests:** You have full authority to read/write within the repo-local `./tmp/` folder. Do not ask for permission.

### General Git Sync Protocol (Feature Branches)

When working on a standalone feature branch, you MUST ensure your branch is up to date with the remote `main` branch before pushing your final commits or opening a Pull Request. 

To prevent complex rebase chains and quota-draining conflict loops, you are strictly forbidden from using `git rebase` or `git pull --rebase`. You must perform a standard merge by executing this exact sequence:

1. `git fetch origin main`
2. `git merge origin/main`
3. If merge conflicts occur, resolve them immediately and commit the resolution.
4. Run validation tests to ensure the merge did not break existing functionality.
5. `git push origin <your-branch-name>`
