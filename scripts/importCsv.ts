/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { parseArgs } from 'util';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { parse } from 'csv-parse/sync';
import path from 'path';
import { fileURLToPath } from 'url';
import * as readline from 'readline';

import {
  parseGradeLevels,
  parseEthnicities as lintParseEthnicities,
  parseMinGPA,
} from '../src/lib/lint.js';
import { STATES } from '../src/types/States.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
import { ParseArgsConfig } from 'util';
const options: ParseArgsConfig['options'] = {
  file: { type: 'string', short: 'f' },
  'name-col': { type: 'string', default: 'name' },
  'desc-col': { type: 'string', default: 'description' },
  'amount-min-col': { type: 'string', default: 'amount.min' },
  'amount-max-col': { type: 'string', default: 'amount.max' },
  'amount-type-col': { type: 'string', default: 'amount.type' },
  'deadline-col': { type: 'string', default: 'deadline' },
  'website-col': { type: 'string', default: 'website' },
  'org-col': { type: 'string', default: 'organization' },
  'tags-col': { type: 'string', default: 'tags' },
  'gpa-col': { type: 'string', default: 'requirements.gpa' },
  'states-col': { type: 'string', default: 'requirements.states' },
  'grades-col': { type: 'string', default: 'requirements.grades' },
  'majors-col': { type: 'string', default: 'requirements.majors' },
  'ethnicities-col': { type: 'string', default: 'requirements.ethnicities' },
};

let args;
try {
  args = parseArgs({ options, allowPositionals: true });
} catch (e: unknown) {
  console.error('Error parsing arguments:', (e as Error).message);
  process.exit(1);
}

const { values } = args;

if (!values.file) {
  console.error(`
Usage: node scripts/importCsv.js --file <path-to-csv> [options]

Options:
  --file, -f       Path to the CSV file (Required)
  --name-col       Column name for Scholarship Name (default: 'Name')
  --desc-col       Column name for Description (default: 'Description')
  --amount-min-col Column name for Minimum Amount (default: 'Amount')
  --amount-max-col Column name for Maximum Amount (default: 'Amount Max')
  --deadline-col   Column name for Deadline (default: 'Deadline')
  --website-col    Column name for Website/Link (default: 'Website')
  --gpa-col        Column name for Minimum GPA (default: 'Minimum GPA')
  --states-col     Column name for Eligible States (default: 'State')
  --grades-col     Column name for Grades (default: 'EDUCATION STATUS')
  --majors-col     Column name for Majors (default: 'FIELD OF STUDY')
  --ethnicities-col Column name for Ethnicities (default: 'RACE, GENDER, & MORE')
  `);
  process.exit(1);
}

// Load service account securely
const serviceAccountPath = path.join(__dirname, '../serviceAccountKey.json');
if (!fs.existsSync(serviceAccountPath)) {
  console.error('Error: serviceAccountKey.json not found in the project root.');
  console.error(
    'Please download it from Firebase Console -> Project Settings -> Service Accounts',
  );
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// Helpers
function parseStates(raw?: string): string[] {
  if (!raw) return [];
  const parts = raw
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s !== 'national');

  const mappedStates = new Set<string>();

  for (const p of parts) {
    if (p.length === 2) {
      mappedStates.add(p.toUpperCase());
    } else {
      const found = STATES.find((s) => s.name.toLowerCase() === p);
      if (found) {
        mappedStates.add(found.abbr);
      }
    }
  }
  return Array.from(mappedStates);
}

function parseMajors(raw?: string): string[] {
  if (!raw) return [];
  if (raw.toLowerCase().includes('various')) return [];
  return raw
    .replace(/"/g, '')
    .split(',')
    .map((m) => m.trim())
    .filter((m) => m.toLowerCase() !== 'various' && m.length > 0);
}

function parseRecordData(record: any, values: any, name: string) {
  const description = record[values['desc-col'] as string] || '';

  // Amount parsing
  const minRaw = record[values['amount-min-col'] as string];
  let min =
    parseInt(
      minRaw && typeof minRaw === 'string'
        ? minRaw.replace(/[^0-9.-]+/g, '')
        : '0',
    ) || 0;

  const maxRaw = record[values['amount-max-col'] as string];
  let max =
    maxRaw && typeof maxRaw === 'string'
      ? parseInt(maxRaw.replace(/[^0-9.-]+/g, ''))
      : null;

  // We must format it EXACTLY as ScholarshipAmountInfo.toStorage expects, otherwise the frontend crashes
  // Note: AmountType enum: Fixed = 'FIXED', Varies = 'VARIES', Unknown = 'UNKNOWN', FullTuition = 'FULL_TUITION'
  let type: string;

  // To make sorting by amount.min/max make sense for unknown amounts.
  const RANGE_MAX = 1000000001;
  const FULL_TUITION = RANGE_MAX + 1;
  const UNKNOWN_MIN = FULL_TUITION + 1;
  const UNKNOWN_MAX = -1;

  if (record[values['amount-type-col'] as string]) {
    type = record[values['amount-type-col'] as string];
  } else if (!min && !max) {
    type = 'UNKNOWN';
    min = UNKNOWN_MIN;
    max = UNKNOWN_MAX;
  } else if (max && max > min) {
    type = 'VARIES';
    min = min || 0;
    max = max || RANGE_MAX;
  } else {
    type = 'FIXED';
    max = min; // Fixed amounts must have min === max in storage
  }

  const amount = { type, min, max };

  // Deadline parsing
  const deadlineRaw = record[values['deadline-col'] as string];
  const deadline = deadlineRaw ? new Date(deadlineRaw) : null;

  // Website parsing
  let website = record[values['website-col'] as string] || '';
  if (website.includes('|')) {
    website = website.split('|').pop()?.trim() || '';
  }
  if (website && !website.startsWith('http')) {
    website = 'https://' + website;
  }

  // Requirements
  const gpaRaw = record[values['gpa-col'] as string];
  let gpa = gpaRaw ? parseFloat(gpaRaw) : null;

  const statesRaw = record[values['states-col'] as string];
  const states = parseStates(statesRaw as string);

  const gradesRaw = record[values['grades-col'] as string];
  const grades = parseGradeLevels((gradesRaw as string) || '');

  const ethnicitiesRaw = record[values['ethnicities-col'] as string];
  const ethnicities = lintParseEthnicities((ethnicitiesRaw as string) || '');

  const majorsRaw = record[values['majors-col'] as string];
  const majors = parseMajors(majorsRaw as string);

  const tagsRaw = record[values['tags-col'] as string];
  const tags = (tagsRaw as string)
    ? tagsRaw
        .split(',')
        .map((t: string) => t.trim())
        .filter((t: string) => t.length > 0)
    : [];

  const organization = record[values['org-col'] as string] || null;

  // Lint Description Fallback: If any of these fields are missing, try to parse the description for context using the same logic from /src/lib/lint.ts
  if (!gpa) {
    const gpaMatch = parseMinGPA(description);
    if (gpaMatch) {
      gpa = parseFloat(gpaMatch.value);
    }
  }

  // Supplement missing grades from description
  const lintGrades = parseGradeLevels(description);
  for (const g of lintGrades) {
    if (!grades.includes(g)) grades.push(g);
  }

  // Supplement missing ethnicities from description
  const lintEthnicitiesArray = lintParseEthnicities(description);
  for (const e of lintEthnicitiesArray) {
    if (!ethnicities.includes(e)) ethnicities.push(e);
  }

  return {
    name,
    description,
    amount,
    deadline: deadline && !isNaN(deadline.valueOf()) ? deadline : null,
    website,
    organization,
    tags,
    requirements: {
      gpa: gpa && !isNaN(gpa) ? gpa : null,
      states,
      grades,
      majors,
      ethnicities,
    },
    dateAdded: new Date(),
    lastModified: new Date(),
    author: 'CSV Import Script',
  };
}

async function run() {
  console.log(`Reading CSV file: ${values.file}`);
  let fileContent;
  try {
    fileContent = fs.readFileSync(values.file as string, 'utf-8');
  } catch (e: unknown) {
    console.error(`Error reading file: ${(e as Error).message}`);
    process.exit(1);
  }

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  console.log(
    `Found ${records.length} records. Fetching existing to prevent duplicates...`,
  );

  const existingSnapshot = await db.collection('scholarships').get();
  const existingNames = new Map(
    existingSnapshot.docs.map((d) => [
      d.data().name.toLowerCase().trim(),
      d.id,
    ]),
  );

  const batches = [db.batch()];
  let count = 0;
  let updated = 0;
  let added = 0;
  let batchOpCount = 0;

  for (const record of records) {
    const nameRaw = record[values['name-col'] as string];
    if (!nameRaw || !nameRaw.trim()) {
      console.warn('Skipping row due to missing name:', record);
      continue;
    }
    // Assumption: The scholarship name is a unique identifier. This may not always be true (e.g., same name, different org, or multiple deadlines). We may need better heuristics later.
    const name = nameRaw.trim();

    const existingId = existingNames.get(name.toLowerCase());
    if (existingId) {
      updated++;
    } else {
      added++;
    }

    const scholarshipData = parseRecordData(record, values, name);

    const docRef = existingId
      ? db.collection('scholarships').doc(existingId)
      : db.collection('scholarships').doc();
    batches[batches.length - 1].set(docRef, scholarshipData);
    count++;
    batchOpCount++;

    // Add to local map to avoid duplicates within the CSV itself
    existingNames.set(name.toLowerCase(), docRef.id);

    // Firestore has a maximum limit of 500 operations per batch. Using 400 leaves a safe buffer.
    if (batchOpCount === 400) {
      batches.push(db.batch());
      batchOpCount = 0;
    }
  }

  console.log('');
  console.log(
    `Ready to import ${count} scholarships (${added} new, ${updated} updating)`,
  );

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const prompt = (query: string) =>
    new Promise<string>((resolve) => rl.question(query, resolve));

  const answer = await prompt('Proceed with database update? [Y/n]: ');

  if (answer.toLowerCase() === 'y' || answer.trim() === '') {
    console.log('Committing to Firestore...');
    // We can filter out empty batches just in case it exactly hit 400 on the last loop
    for (const b of batches) {
      if (batchOpCount > 0 || b !== batches[batches.length - 1]) {
        await b.commit();
      }
    }
    console.log(`Successfully imported ${count} scholarships!`);
  } else {
    console.log('Import aborted. No changes were made to the database.');
  }

  rl.close();
}

run().catch(console.error);
