### Cross-Agent Sync Rule

Within an Epic branch, agents are permitted to commit and push directly to the shared branch without creating a PR. When completing a task, you must update the `.TODO.md` and commit the change so the Orchestrator and other specialists see it immediately upon their next `git pull`.

### Local Scratchpad & CLI Inputs

1. **Use Repo-Local Tmp:** All temporary files created for CLI inputs (e.g., `gh pr comment -F`), logs, or intermediate processing MUST be created in the `./tmp/` directory at the root of the repository.
2. **Auto-Initialization:** If the `./tmp/` directory does not exist, you are authorized to create it immediately using `mkdir -p ./tmp/`.
3. **Cleanup:** While these files are gitignored, you should aim to delete them after a successful CLI operation to keep the workspace tidy.
4. **No Permission Requests:** You have full authority to read/write within the repo-local `./tmp/` folder. Do not ask for permission.
