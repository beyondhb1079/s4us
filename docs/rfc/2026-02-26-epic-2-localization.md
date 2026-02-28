# RFC: Comprehensive Localization (Spanish) for Undocumented Students (Epic 2)

**Date**: 2026-02-26
**Status**: Final (Corrected)

## 1. Problem

Currently, S4US has a robust localization foundation configured in `package.json` (using `react-i18next` and `i18next-browser-languagedetector`), and many core pages in `/public/locales/` are already translated into Spanish. However, the App Shell and newer features (like the Admin Dashboard) are only partially localized, creating a fragmented bilingual experience.

## 2. Proposed Solution

Audit the existing codebase to identify untranslated strings in the App Shell and complete the English-to-Spanish localization pass without touching the dynamic scholarship data.

## 3. Architecture & Implementation Requirements

### A. Strict Translation Scope (The "App Shell Only" Rule)

Our localization strategy strictly dictates **what we translate** and **what we do not**:

- **We DO Translate:**
  - Static App Shell UI (Navigation, Footers, Buttons, Modals, Forms).
  - Pre-defined Database Enums (e.g., specific `requirements` categories or dropdown values).
- **We DO NOT Translate:**
  - Dynamic user-generated or AI-scraped data, specifically the `name` and `description` of the scholarships.
  - Proper nouns or organizational names.

### B. Implementation Steps

1. **Audit & Extract:** Use static code analysis (regex) to identify hardcoded English strings in JSX (focusing on global navigation and core landing pages).
2. **Translation File Updates:**
   - Update `public/locales/en/` and `public/locales/es/`.
   - **Persona-Driven Correction:** Purge anglicisms. Specifically, correct `"submit": "Submitir"` in `common.json` to **"Enviar"** or **"Compartir"**. Use inviting labels like "Compartir enlace de beca".
3. **UI Integration:** Wrap strings in `t()`. Leverage TypeScript strict typing for `t` to programmatically prevent dynamic data (scholarship names/descriptions) from being passed to the translation engine.
4. **Language Toggle (Audit):** Verify the existing `TranslationMenu.tsx` handles session persistence via `localStorage` (via `i18next-browser-languagedetector`). Ensure it is correctly placed in all layouts.

## 4. Work Breakdown (Acceptance Criteria)

1. **Frontend Specialist:**
   - Audit application for missing string extractions via regex.
   - Refine existing `TranslationMenu` if session persistence is missing.
   - Enforce "App Shell Only" via TypeScript strict resource types for `i18next`.
2. **Inclusion Officer:**
   - Review Spanish copy for "Parent Co-Pilot" persona (supportive vs instructional tone).
   - Ensure proper nouns (e.g., "QuestBridge") remain in English for searchability.
3. **QA Explorer:**
   - **Visual Regression:** Perform "mobile squint tests" (320px-375px) for text expansion overflow in Navigation and Filter Chips.
   - **Stress Test:** Pseudo-localization testing with 30% longer strings.
   - **Persistence:** Verify deep linking with optional `?lng=es` query parameter support.
