---
description: Mandatory pre-push verification steps to ensure no CI regressions are introduced.
---

# Code Verification Workflow

Before executing `git push` or submitting an autonomous Pull Request, you must verify that your changes have not broken the application build, tests, or strict CI formatting checks.

## Step 1: Formatting and Translations (CRITICAL)

GitHub Actions will immediately fail if code is not formatted or if translations are missing. Run these first to guarantee CI compliance:

```bash
// turbo
npx prettier --write .
npx i18next-parser
```

## Step 2: Linting

Ensure no new syntax errors or unused variables were introduced.

```bash
// turbo
yarn lint
```

## Step 3: Type Checking & Building

Verify that the TypeScript compiler can successfully transpile. This blocks the production deployment, so do not skip it.

```bash
// turbo
yarn build
```

## Step 3: Unit Testing

Run the Vitest suite (without hanging in watch mode) to ensure you haven't broken any existing logic.

```bash
// turbo
yarn test:run
```

If any step fails, parse the standard output, fix the errors, and rerun all checks from Step 1 before pushing.
