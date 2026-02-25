/**
 * Setup Instructions:
 * 1. Ensure you have the OPENAI_API_KEY environment variable set.
 *    export OPENAI_API_KEY=your_key_here
 * 2. Run the script using tsx:
 *    npx tsx scripts/scrapeWeb.ts <URL>
 */
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import * as cheerio from 'cheerio';
import { z } from 'zod';
import { writeFileSync } from 'fs';

const url = process.argv[2];

if (!url) {
  console.error('Usage: npx tsx scripts/scrapeWeb.ts <URL>');
  process.exit(1);
}

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

async function scrape() {
  console.log(`Fetching HTML from ${url}...`);
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const html = await response.text();

    console.log('Parsing text content...');
    const $ = cheerio.load(html);
    $('script, style, noscript, iframe, img, svg').remove();
    const textContent = $('body').text().replace(/\s+/g, ' ').trim();

    console.log(
      `Extracting scholarship data using OpenAI (Text Length: ${textContent.length})...`,
    );

    // Assumes process.env.OPENAI_API_KEY is set in the shell
    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: ScholarshipSchema,
      prompt: `Extract the scholarship details from the following web page content:\n\n${textContent.slice(0, 40000)}`,
    });

    console.log('\n✅ Extraction Complete!');
    console.log(JSON.stringify(object, null, 2));

    writeFileSync('scraped-offer.json', JSON.stringify(object, null, 2));
    console.log('Saved result to scraped-offer.json');
  } catch (err: unknown) {
    console.error('Error scraping:', (err as Error).message);
  }
}

scrape();
