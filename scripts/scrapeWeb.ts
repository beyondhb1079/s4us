/**
 * Setup Instructions:
 * 1. Ensure you have the GEMINI_API_KEY environment variable set.
 *    export GEMINI_API_KEY=your_key_here
 * 2. Run the script using tsx:
 *    npx tsx scripts/scrapeWeb.ts <URL1> [URL2] ...
 */
import { generateObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import * as cheerio from 'cheerio';
import { z } from 'zod';
import { writeFileSync } from 'fs';
import fs from 'fs';

const urls = process.argv.slice(2);

if (urls.length === 0) {
  console.error('Usage: npx tsx scripts/scrapeWeb.ts <URL1> [URL2] ...');
  process.exit(1);
}

const google = createGoogleGenerativeAI({
  apiKey:
    process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY,
});

const AmountSchema = z.object({
  type: z.enum(['FIXED', 'VARIES']),
  min: z.number().describe('Minimum amount in dollars. Use 0 if unknown.'),
  max: z.number().describe('Maximum amount in dollars. Use 0 if unknown.'),
});

const EligibilitySchema = z.object({
  gpa: z
    .number()
    .nullable()
    .describe('Minimum GPA required on a 4.0 scale. Null if not specified.'),
  majors: z
    .array(z.string())
    .describe(
      'List of eligible college majors or fields of study. Empty if any.',
    ),
  states: z
    .array(z.string())
    .describe(
      'List of eligible 2-letter US state abbreviations (e.g. CA, NY). Empty if National.',
    ),
  schools: z
    .array(z.string())
    .describe('List of specific eligible colleges/universities. Empty if any.'),
  grades: z
    .array(z.number())
    .describe(
      'Eligible grade levels: 8-12 for High school, 13-16 for Undergrad, 17+ for Graduate. Empty if any.',
    ),
  ethnicities: z
    .array(
      z.enum([
        'AMERICAN_INDIAN_OR_ALASKA_NATIVE',
        'ASIAN',
        'BLACK_OR_AFRICAN_AMERICAN',
        'HISPANIC_OR_LATINO',
        'NATIVE_HAWAIIAN_OR_OTHER_PACIFIC_ISLANDER',
        'WHITE',
      ]),
    )
    .describe('Eligible ethnicities. Empty if any ethnicity is allowed.'),
});

const ScholarshipSchema = z.object({
  name: z.string().describe('The official name of the scholarship'),
  description: z
    .string()
    .describe('A 2-3 sentence summary of the scholarship criteria and purpose'),
  website: z
    .string()
    .describe('The URL where students can apply or learn more'),
  amount: AmountSchema,
  deadline: z
    .string()
    .describe(
      'The application deadline in ISO 8601 format (YYYY-MM-DD). If unknown, leave empty.',
    ),
  organization: z
    .string()
    .nullable()
    .describe(
      'The organization, foundation, or company offering the scholarship',
    ),
  tags: z
    .array(z.string())
    .describe(
      'Relevant categorical keywords like LGBTQ+, STEM, First Generation, Low Income, etc. Empty if no tags.',
    ),
  requirements: EligibilitySchema.nullable(),
});

const ResponseSchema = z.object({
  scholarships: z.array(ScholarshipSchema),
});

async function scrape() {
  const allScholarships = [];

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    console.log(`\n[${i + 1}/${urls.length}] Fetching HTML from ${url}...`);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();

      console.log('Parsing text content...');
      const $ = cheerio.load(html);
      $('script, style, noscript, iframe, img, svg').remove();
      const textContent = $('body').text().replace(/\s+/g, ' ').trim();

      console.log(
        `Extracting scholarship data using Gemini (Text Length: ${textContent.length})...`,
      );

      // Assumes process.env.GEMINI_API_KEY is set in the shell
      const { object } = await generateObject({
        model: google('gemini-3.0-flash'),
        schema: ResponseSchema,
        prompt: `Extract all scholarship details from the following web page content. If there are multiple scholarships listed, extract each one of them:\n\n${textContent}`,
      });

      console.log(
        `✅ Extracted ${object.scholarships.length} scholarships from ${url}.`,
      );

      allScholarships.push(...object.scholarships);

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
