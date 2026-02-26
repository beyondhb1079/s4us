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
  - Admin Dashboard UI (`/admin`).
  - Pre-defined Database Enums (e.g., specific `requirements` categories or dropdown values).
- **We DO NOT Translate:**
  - Dynamic user-generated or AI-scraped data, specifically the `name` and `description` of the scholarships.
  - Proper nouns or organizational names.

### B. Implementation Steps

1. **Audit & Extract:** Identify any remaining hardcoded English strings in the React components (especially newer components like `/admin` and global navigation components).
2. **Translation File Updates:** Add the missing keys to the existing JSON files in `public/locales/en/` and provide accurate Spanish translations in `public/locales/es/`.
3. **UI Integration:** Ensure the `t()` function from `react-i18next` wraps all newly identified hardcoded strings.
4. **Language Toggle:** Build a visible Language Toggle (EN/ES) in the User Navigation bar so users can manually override automatic browser detection.

## 4. Work Breakdown (Acceptance Criteria)

1. **Frontend Specialist:**
   - Audit the application for missing string extractions (specifically `/admin` and global navigation).
   - Update `public/locales/en/` and `public/locales/es/` with the missing UI translations.
   - Enforce the "App Shell Only" rule; ensure dynamic scholarship `name` and `description` fields remain untranslated.
   - Build/verify the EN/ES toggle in the top navigation bar.
2. **Inclusion Officer:**
   - Review the newly added Spanish UI copy to ensure it aligns with the culturally supportive "Parent Co-Pilot" persona.
3. **QA Explorer:**
   - Test the Language Toggle for immediate UI updates without a hard refresh.
   - Verify layout stability, as Spanish text often expands by 20-30% compared to English, ensuring the new UI elements do not break.
