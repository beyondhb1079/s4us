---
name: Data Fetching with TanStack Query
description: Best practices and conventions for fetching and mutating data in the S4US application using TanStack Query.
---

# TanStack Query Implementation Skill

The S4US project relies heavily on `@tanstack/react-query` v5 for managing asynchronous state, caching Firestore responses, and handling loading/error UI states efficiently.

When an agent needs to fetch data from Firestore, manage complex loading skeletons, or execute database mutations, they must apply this skill to utilize TanStack Query patterns to ensure cache consistency and minimize unnecessary database reads.

## 1. Best Practices & Conventions

- **Keys Must Be Arrays:** Always define your `queryKey` as an array (e.g., `['scholarships', filters]`). This is required by v5 API.
- **Colocation of Queries:** Define custom hooks for queries in `src/hooks/` (e.g., `useScholarships.ts`) rather than writing raw `useQuery` configurations directly inline inside UI components. This keeps the presentation layer clean.
- **Pagination via `useInfiniteQuery`:** Do not use standard `useQuery` for unpredictable lists of documents. Instead, use `useInfiniteQuery` combined with Firestore's `startAfter()` cursors to paginate data efficiently. Our queries are batched to 15-25 documents per page to conserve network bandwidth and reduce Firebase read operations.

## 2. Instructions: Building a Query Hook

When building a new data access layer:

1. Import `useQuery` or `useInfiniteQuery` from `@tanstack/react-query`.
2. Construct your Firebase `query()` using modular SDK functions (`where`, `orderBy`, `limit`).
3. Call `getDocs()` and map the results through the model's `FirestoreDataConverter` (which reliably handles Timestamp to Date object conversions).

**Example Reference:**

```tsx
import { useQuery } from '@tanstack/react-query';
import { collection, query, where, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase';
import { converter } from '../models/Scholarships';

export function useScholarshipById(id: string) {
  return useQuery({
    queryKey: ['scholarship', id],
    queryFn: async () => {
      // Implement isolated fetch logic here
    },
  });
}
```

## 3. Important: Cache Invalidation

Whenever you execute a mutation (e.g., an Admin updating a user profile or editing a scholarship's deadline), you **must** invalidate the affected query instances so the client UI refetches the fresh remote data instantly.

```tsx
import { useQueryClient } from '@tanstack/react-query';

// Inside component:
const queryClient = useQueryClient();

// After awaiting an API mutation successfully:
queryClient.invalidateQueries({ queryKey: ['scholarships'] });
```
