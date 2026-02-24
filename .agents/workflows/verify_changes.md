---
description: Mandatory pre-push verification steps to ensure no regressions are introduced.
---

# Code Verification Workflow

Before executing `git push` or submitting an autonomous Pull Request, you must verify that your changes have not broken the application build or tests.

## Step 1: Linting

Ensure no new syntax errors, formatting issues, or unused variables were introduced.

```bash
// turbo
yarn lint
```

## Step 2: Type Checking & Building

Verify that the TypeScript compiler can successfully transpile the code without throwing strict type errors. This is crucial as TypeScript errors will block the Vercel production deployment.

```bash
// turbo
yarn build
```

## Step 3: Unit Testing

Run the Vitest suite to ensure you haven't broken any existing business logic or custom hooks.

```bash
// turbo
yarn test
```

If any of these three steps fail, you **must** parse the standard output, fix the errors in the code, and rerun the checks before attempting to push your code.
