import fs from 'fs';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// NOTE: To run this script, you will need to:
// 1. Install csv-parse and firebase-admin: `npm install csv-parse firebase-admin --no-save`
// 2. Download your Firebase Admin service account key JSON file from the Firebase Console (Project Settings -> Service Accounts)
// 3. Save it as `serviceAccountKey.json` in the root of the project (make sure it's in .gitignore!)
// 4. Download your Airtable CSV and save it as `airtable_export.csv`
// 5. Run the script: `node scripts/importAirtable.js`

import { parse } from 'csv-parse/sync';

// Initialize Firebase Admin
// Replace with the path to your service account key
import serviceAccount from '../serviceAccountKey.json' assert { type: 'json' };

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function run() {
  console.log('Reading CSV file...');
  const fileContent = fs.readFileSync('airtable_export.csv', 'utf-8');

  // Parse the CSV
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  console.log(`Found ${records.length} records. Uploading to Firestore...`);

  const batch = db.batch();
  let count = 0;

  for (const record of records) {
    // Map Airtable columns to Firestore schema
    // Note: You will need to adjust these field names based on the actual Airtable CSV headers
    const scholarshipData = {
      name: record['Name'] || 'Untitled Scholarship',
      description: record['Description'] || '',
      amount: {
        type: 'fixed',
        min: parseInt(record['Amount'] || '0'),
      },
      deadline: record['Deadline'] ? new Date(record['Deadline']) : null,
      website: record['Website'] || '',
      requirements: {
        gpa: parseFloat(record['Minimum GPA']) || null,
        states: record['State']
          ? record['State'].split(',').map((s) => s.trim())
          : [],
        // ... map other requirements
      },
      dateAdded: new Date(),
      lastModified: new Date(),
      author: 'Airtable Import',
    };

    // Create a new document reference in the 'scholarships' collection
    const docRef = db.collection('scholarships').doc();
    batch.set(docRef, scholarshipData);
    count++;

    // Firestore batches are limited to 500 operations
    if (count % 400 === 0) {
      await batch.commit();
      console.log(`Committed ${count} records...`);
    }
  }

  // Commit any remaining records
  if (count % 400 !== 0) {
    await batch.commit();
  }

  console.log(`Successfully imported ${count} scholarships!`);
}

run().catch(console.error);
