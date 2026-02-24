"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncCollegeScorecard = void 0;
const scheduler_1 = require("firebase-functions/v2/scheduler");
const params_1 = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
admin.initializeApp();
const scorecardApiKey = (0, params_1.defineSecret)('SCORECARD_API_KEY');
exports.syncCollegeScorecard = (0, scheduler_1.onSchedule)({
    schedule: '0 0 1 * *',
    timeoutSeconds: 540,
    memory: '512MiB',
    secrets: [scorecardApiKey],
}, async (event) => {
    logger.info('Syncing College Scorecard data...');
    // Access the secret at runtime. Fallback to DEMO_KEY for initial testing.
    const API_KEY = scorecardApiKey.value() || 'DEMO_KEY';
    const BASE_URL = 'https://api.data.gov/ed/collegescorecard/v1/schools.json';
    let page = 0;
    let hasMore = true;
    const allSchools = [];
    try {
        while (hasMore) {
            const url = `${BASE_URL}?api_key=${API_KEY}&school.degrees_awarded.predominant=2,3,4&fields=school.name,school.state,school.school_url,school.degrees_awarded.predominant&per_page=100&page=${page}`;
            logger.info(`Fetching page ${page}...`);
            const response = await fetch(url);
            if (!response.ok) {
                if (response.status === 429 && API_KEY === 'DEMO_KEY') {
                    logger.warn('Rate limited by DEMO_KEY (limit is 40req/hr). Please provide a real SCORECARD_API_KEY. Stopping sync early.');
                    break;
                }
                throw new Error(`API returned ${response.status}: ${response.statusText}`);
            }
            const data = await response.json();
            const results = data.results || [];
            if (results.length === 0) {
                hasMore = false;
                break;
            }
            const mapped = results.map((s) => ({
                n: s['school.name'],
                s: s['school.state'],
                u: s['school.school_url']
                    ? s['school.school_url'].startsWith('http')
                        ? s['school.school_url']
                        : `https://${s['school.school_url']}`
                    : null,
            }));
            allSchools.push(...mapped);
            // Stop if we got less than per_page or if the metadata says we're done
            if (results.length < 100) {
                hasMore = false;
            }
            else {
                page++;
            }
        }
        // Sort array alphabetically by name (key 'n') for the UI dropdown
        allSchools.sort((a, b) => a.n.localeCompare(b.n));
        // Write directly to the default Firebase Storage bucket
        const bucket = admin.storage().bucket();
        const file = bucket.file('data/schools.json');
        // Save without indentation to minimize size
        await file.save(JSON.stringify(allSchools), {
            metadata: {
                contentType: 'application/json',
                // Instruct CDN and browsers to cache aggressively
                cacheControl: 'public, max-age=31536000, immutable',
            },
        });
        // Make the file public so it's accessible via the direct storage link
        await file.makePublic();
        logger.info(`Successfully synced ${allSchools.length} degree-granting schools to Storage.`);
    }
    catch (error) {
        logger.error('Error syncing schools', error);
    }
});
//# sourceMappingURL=index.js.map