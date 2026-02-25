---
description: How to safely run Vitest tests and the Firebase Emulators in the background during active development.
---

# Local Development & Testing Workflow

This workflow describes the safe, standard process for verifying your code changes using Vitest and testing Firestore schema functionality via the Firebase emulators without blocking the terminal.

## Step 1: Run Unit Tests

We use Vitest as our test runner.
Whenever you manipulate business logic, state reducers, or custom hooks, ensure you run the associated unit test files. **Do not run `yarn test` as it will hang in watch mode.**

```bash
# Run tests for a specific file and exit
yarn test:run <path_to_file.test.tsx>

# Example:
yarn test:run src/lib/useQueryParams.test.tsx
```

## Step 2: Start Firebase Emulators in the Background

If you modify `firestore.rules`, Firebase Functions, or need to click around the UI without corrupting production data, spin up the local emulator suite using the background daemon.

```bash
// turbo
yarn emulators:daemon:start
```

_Note: This command runs `firebase emulators:start --project demo-s4us` which binds to localhost ports. Ensure no background Node processes are hogging ports `8080` (Firestore) or `9099` (Auth)._

## Step 3: Verify the UI

1. Start the Vite React development server:

```bash
// turbo
yarn dev
```

2. The UI will automatically connect to the local emulator instances if the process detects `localhost` environment variables. Visit `http://localhost:5173`.

## Step 4: Cleanup

Once you are finished verifying the UI or running your tests, you **must** shut down the background emulators to free up ports 8080 and 9099.

```bash
// turbo
yarn emulators:daemon:stop
```
