/**
 * Setup Instructions:
 * 1. Ensure you have the GEMINI_API_KEY environment variable set.
 *    export GEMINI_API_KEY=your_key_here
 * 2. Run the script using tsx:
 *    npx tsx scripts/scrapeWeb.ts <URL1> [URL2] ...
 */
import { writeFileSync } from 'fs';
import fs from 'fs';
import { extractScholarshipsFromHtml } from '../functions/src/services/aiScraper';

const urls = process.argv.slice(2);

if (urls.length === 0) {
  console.error('Usage: npx tsx scripts/scrapeWeb.ts <URL1> [URL2] ...');
  process.exit(1);
}

const apiKey =
  process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!apiKey) {
  console.error(
    'Missing GEMINI_API_KEY or GOOGLE_GENERATIVE_AI_API_KEY environment variable.',
  );
  process.exit(1);
}

async function scrape() {
  const allScholarships = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`\n[${i + 1}/${urls.length}] Fetching HTML from ${url}...`);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();

      console.log('Extracting scholarship data using Gemini...');

      const scholarships = await extractScholarshipsFromHtml(
        html,
        apiKey as string,
      );

      console.log(
        `✅ Extracted ${scholarships.length} scholarships from ${url}.`,
      );

      allScholarships.push(...scholarships);

      // Enforce a 15-second delay to respect 5 RPM limits, except after the last URL
      if (i < urls.length - 1) {
        console.log(
          'Waiting 15 seconds before the next request to respect rate limits...',
        );
        await new Promise((resolve) => setTimeout(resolve, 15000));
      }
    } catch (err: unknown) {
      console.error(`Error scraping ${url}:`, (err as Error).message);
    }
  }

  if (allScholarships.length === 0) {
    console.log('\nNo scholarships were extracted across any of the URLs.');
    return;
  }

  console.log(
    `\n🎉 Extraction Complete! Found a total of ${allScholarships.length} scholarships.`,
  );

  // Convert to CSV for importCsv.ts
  const headers = [
    'name',
    'description',
    'amount.min',
    'amount.max',
    'amount.type',
    'deadline',
    'website',
    'organization',
    'tags',
    'requirements.gpa',
    'requirements.majors',
    'requirements.states',
    'requirements.schools',
    'requirements.grades',
    'requirements.ethnicities',
  ];

  const rows = allScholarships.map((s) => {
    const requirements = s.requirements;
    return [
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.description.replace(/"/g, '""')}"`,
      s.amount.min,
      s.amount.max,
      s.amount.type,
      s.deadline,
      s.website,
      `"${(s.organization || '').replace(/"/g, '""')}"`,
      `"${(s.tags || []).join(', ')}"`,
      requirements?.gpa || '',
      `"${(requirements?.majors || []).join(', ')}"`,
      `"${(requirements?.states || []).join(', ')}"`,
      `"${(requirements?.schools || []).join(', ')}"`,
      `"${(requirements?.grades || []).join(', ')}"`,
      `"${(requirements?.ethnicities || []).join(', ')}"`,
    ].join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\n');

  const outputDir = './tmp';
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputPath = `${outputDir}/scraped-${timestamp}.csv`;

  writeFileSync(outputPath, csvContent);
  console.log(`Saved result to ${outputPath}`);

  // Also save raw JSON for debugging
  writeFileSync(
    `${outputDir}/scraped-${timestamp}.json`,
    JSON.stringify({ scholarships: allScholarships }, null, 2),
  );
}

scrape();
