/**
 * Duplicate Detection Script
 *
 * Usage:
 * npx tsx scripts/findDuplicates.ts
 *
 * This script bypasses security rules to read all scholarships and
 * generates a detailed JSON report of name/website duplicates.
 */
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

// Load service account securely
let serviceAccount;
try {
  serviceAccount = JSON.parse(
    readFileSync(resolve('serviceAccountKey.json'), 'utf8'),
  );
} catch (e) {
  console.error(
    "Missing or invalid serviceAccountKey.json. Please ensure it's in the root directory.",
  );
  process.exit(1);
}

// Initialize Firebase Admin (this allows us to bypass security rules and read all docs)
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function findDuplicates() {
  console.log('Fetching all scholarships from Firestore...');
  const snapshot = await db.collection('scholarships').get();

  const map = new Map<string, any[]>();

  // Group scholarships by lowercase name to catch Name-level duplicates
  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    if (!data.name) return;

    const nameKey = data.name.trim().toLowerCase();

    if (!map.has(nameKey)) {
      map.set(nameKey, []);
    }
    map.get(nameKey)!.push({
      id: doc.id,
      name: data.name,
      website: data.website,
      amount: data.amount,
    });
  });

  const exactDuplicates: any[] = [];
  const nameOnlyDuplicates: any[] = [];

  for (const [name, docs] of map.entries()) {
    // If we have more than one scholarship with the exact same case-insensitive name
    if (docs.length > 1) {
      const websites = new Set<string>();
      let hasExactDuplicate = false;

      // Check if they also share the exact same website URL
      for (const d of docs) {
        const url = (d.website || '').trim().toLowerCase();
        if (websites.has(url)) {
          hasExactDuplicate = true;
        }
        websites.add(url);
      }

      if (hasExactDuplicate) {
        exactDuplicates.push({ name, count: docs.length, scholarships: docs });
      } else {
        nameOnlyDuplicates.push({
          name,
          count: docs.length,
          scholarships: docs,
        });
      }
    }
  }

  console.log(`\n================================`);
  console.log(
    `Found ${exactDuplicates.length} groups of EXACT duplicates (Same Name + Same Website).`,
  );
  console.log(
    `Found ${nameOnlyDuplicates.length} groups of POTENTIAL duplicates (Same Name, Different URLs).`,
  );
  console.log(`================================\n`);

  const report = { exactDuplicates, nameOnlyDuplicates };

  try {
    mkdirSync('tmp', { recursive: true });
  } catch (e) {
    // Ignore error if it already exists
  }

  writeFileSync('tmp/duplicates-report.json', JSON.stringify(report, null, 2));
  console.log('Saved detailed report to tmp/duplicates-report.json');
}

findDuplicates().catch(console.error);
