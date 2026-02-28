# Epic 4: Onboarding Wizard & Personalization

## Problem Statement
The S4US platform has implemented a new Onboarding Wizard (PR #1474) to capture user demographics, education level, and field of study. However, the architectural integration of this data needs refinement to balance personalization with our core directives of low friction, trust, and financial pragmatism. Specifically, we must determine how to store this data for guest users, how to make the feature discoverable, and how to display the tailored results (a dedicated "For You" tab vs. a pre-populated filter sidebar).

## Proposed Solution & Architecture

### 1. Progressive Disclosure (The `localStorage` Strategy)
**Constraint:** Forcing users to create an account to access personalized filters creates a massive trust barrier for undocumented students.
- **Implementation:** The Onboarding Wizard must function purely off `localStorage` by default. Any guest user can complete the wizard and receive immediate value (a filtered scholarship feed).
- **Data Migration:** When a guest user attempts to bookmark a scholarship or explicitly signs up, the application will intercept the `localStorage` payload and migrate it to their new Firestore user document.

### 2. Discoverability & Upsells
- **New Users:** If a user navigates to the scholarship list without completing the wizard, the default view must include a prominent Banner CTA or stylized Empty State: *"Unlock Your Personalized Feed. Tell us a bit about yourself to instantly filter out scholarships you aren't eligible for."*
- **Existing Users:** For users with incomplete profiles, a dismissible inline banner at the top of the main feed will prompt them to update their match preferences. The wizard will also be permanently accessible via the User Profile dropdown.

### 3. UX Integration: "For You" Tab vs. Pre-populated Sidebar
- **The Debate:** A separate "For You" tab splits the user journey and risks hiding results if users default to "Search All" and ignore the tab.
- **The Decision:** Instead of a dedicated tab, the Onboarding Wizard data will **pre-populate the existing left-hand Filter Sidebar**. This unifies the UX into a single feed. Users can clearly see which filters are dynamically limiting their results and can easily toggle them off to broaden their search without switching context.

### 4. Leveraging Data (Future Epics)
- **Automated Alerts:** For logged-in users, this captured preference data will power a weekly Cloud Function cron job that emails a digest of newly added scholarships matching their specific criteria.
- **Scraper Intelligence:** Anonymized, aggregated data of popular wizard selections (e.g., highly requested majors or geographic regions) will be fed to the Data Shield to direct the AI web scraper to prioritize finding high-demand resources.

## Security & Privacy Impact
- Storing preferences in `localStorage` for guests exposes no PII to the server until the user explicitly consents by creating an account.
- Firestore Security Rules must ensure that users can only read and write their own preference data inside their user document.

## Cost & Rate Limit Assessment
- **Cost:** Relying on `localStorage` for guests significantly reduces initial Firestore `write` and `read` operations to exactly zero for non-authenticated traffic, perfectly aligning with our Financial Pragmatism rule.
- **Scale:** At 5,000 active users, migrating profiles to Firestore incurs minimal cost (1 write per auth event).

## Next Steps / Execution Plan
1. Refactor `OnboardingWizard` state management to a generic hook backed by `localStorage` for guests and Firestore for authenticated users.
2. Integrate the preference state directly into the `ScholarshipList` sidebar instead of rendering a separate "For You" tab.
3. Build the UI entry points (Empty State CTA, Profile Dropdown) to ensure seamless discoverability.
