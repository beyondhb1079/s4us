---
description: How to run Vitest tests and the Firebase Emulators during active development
---

# Local Development & Testing Workflow

This workflow describes the safe, standard process for verifying your code changes using Vitest and testing Firestore schema functionality via the Firebase emulators.

## Step 1: Run Unit Tests

We use Vitest as our test runner (replacing Jest).
Whenever you manipulate business logic, state reducers, or custom hooks, ensure you run the associated unit test files.

```bash
# Run tests for a specific file
yarn vitest run <path_to_file.test.tsx>

# Example:
yarn vitest run src/lib/useQueryParams.test.tsx
```

## Step 2: Start Firebase Emulators

If you modify `firestore.rules`, Firebase Functions, or need to click around the UI without corrupting production data, spin up the local emulator suite.

```bash
// turbo
yarn emulators
```

_Note: This command runs `firebase emulators:start --project demo-s4us` which binds to localhost ports. Ensure no background Node processes are hogging ports `8080` (Firestore) or `9099` (Auth)._

## Step 3: Verify the UI

1. Once the emulator is running, open a separate terminal pane.
2. Start the Vite React development server:

```bash
// turbo
yarn dev
```

3. The UI will automatically connect to the local emulator instances if the process detects `localhost` environment variables. Visit `http://localhost:5173`.
