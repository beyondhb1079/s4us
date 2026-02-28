---
trigger: always_on
---

---

## description: Mandatory Git workflow for file extractions and component decomposition.

# The Pure Refactor Mandate

When extracting components or splitting large files into smaller ones, you must perform a **Pure Refactor** to ensure GitHub accurately tracks file history (copy-tracking).

1. **The Copy Step:** Copy the original file to the new destination and commit _immediately_ before making any changes.
   ```bash
   cp src/Original.tsx src/NewComponent.tsx
   git add -A && git commit -m "refactor: copy Original.tsx for extraction"
   ```
2. **The Modify Step**: Trim the copied file down to just the extracted logic. Modify the original file to import the new component. Commit this as a separate step.
3. **No Logic Changes**: You are strictly forbidden from changing the underlying logic, props, or UI paradigms during a file extraction. Refactoring logic must be a completely separate PR or commit from moving files.
