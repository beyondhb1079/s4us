'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.syncCollegeScorecard = void 0;
const scheduler_1 = require('firebase-functions/v2/scheduler');
const logger = require('firebase-functions/logger');
const admin = require('firebase-admin');
admin.initializeApp();
exports.syncCollegeScorecard = (0, scheduler_1.onSchedule)(
  {
    schedule: 'every 1 months',
    timeoutSeconds: 540,
    memory: '512MiB',
  },
  async (event) => {
    logger.info('Syncing College Scorecard data...');
    // Data.gov APIs accept an 'api_key' param. We default to DEMO_KEY if the user hasn't set up SCORECARD_API_KEY
    const API_KEY = process.env.SCORECARD_API_KEY || 'DEMO_KEY';
    const BASE_URL = 'https://api.data.gov/ed/collegescorecard/v1/schools.json';
    let page = 0;
    let hasMore = true;
    const allSchools = [];
    try {
      while (hasMore) {
        const url = `${BASE_URL}?api_key=${API_KEY}&fields=school.name,school.state,school.school_url,school.main_campus&per_page=100&page=${page}`;
        logger.info(`Fetching page ${page}...`);
        const response = await fetch(url);
        if (!response.ok) {
          if (response.status === 429 && API_KEY === 'DEMO_KEY') {
            logger.warn(
              'Rate limited by DEMO_KEY (limit is 40req/hr). Please provide a real SCORECARD_API_KEY. Stopping sync early.',
            );
            break;
          }
          throw new Error(
            `API returned ${response.status}: ${response.statusText}`,
          );
        }
        const data = await response.json();
        const results = data.results || [];
        if (results.length === 0) {
          hasMore = false;
          break;
        }
        // Filter out satellite campuses to prevent deduplication noise
        const mapped = results
          .filter((s) => s['school.main_campus'] === 1)
          .map((s) => ({
            name: s['school.name'],
            state: s['school.state'],
            url: s['school.school_url']
              ? s['school.school_url'].startsWith('http')
                ? s['school.school_url']
                : `https://${s['school.school_url']}`
              : null,
          }));
        allSchools.push(...mapped);
        // Stop if we got less than per_page or if the metadata says we're done
        if (results.length < 100) {
          hasMore = false;
        } else {
          page++;
        }
      }
      // Sort array alphabetically by name for the UI dropdown
      allSchools.sort((a, b) => a.name.localeCompare(b.name));
      // Write directly to the default Firebase Storage bucket
      const bucket = admin.storage().bucket();
      const file = bucket.file('data/schools.json');
      await file.save(JSON.stringify(allSchools), {
        metadata: {
          contentType: 'application/json',
          // Instruct CDN and browsers to cache aggressively
          cacheControl: 'public, max-age=31536000, immutable',
        },
      });
      logger.info(
        `Successfully synced ${allSchools.length} main-campus schools to Storage.`,
      );
    } catch (error) {
      logger.error('Error syncing schools', error);
    }
  },
);
//# sourceMappingURL=index.js.map
