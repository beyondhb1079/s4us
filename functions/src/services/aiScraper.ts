import { generateObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import * as cheerio from 'cheerio';
import { z } from 'zod';

export const AmountSchema = z.object({
  type: z.enum(['FIXED', 'VARIES']),
  min: z.number().describe('Minimum amount in dollars. Use 0 if unknown.'),
  max: z.number().describe('Maximum amount in dollars. Use 0 if unknown.'),
});

export const EligibilitySchema = z.object({
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

export const ScholarshipSchema = z.object({
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

export const ResponseSchema = z.object({
  scholarships: z.array(ScholarshipSchema),
});

export type ExtractedScholarship = z.infer<typeof ScholarshipSchema>;

/**
 * Extracts scholarship details from raw HTML content using Gemini 3.0 Flash.
 *
 * @param html The raw HTML string.
 * @param apiKey The Gemini API key.
 * @returns An array of extracted scholarships.
 */
export async function extractScholarshipsFromHtml(
  html: string,
  apiKey: string,
): Promise<ExtractedScholarship[]> {
  const google = createGoogleGenerativeAI({
    apiKey,
  });

  const $ = cheerio.load(html);
  $('script, style, noscript, iframe, img, svg').remove();
  const textContent = $('body').text().replace(/\s+/g, ' ').trim();

  const { object } = await generateObject({
    model: google('gemini-3.0-flash'),
    schema: ResponseSchema,
    prompt: `Extract all scholarship details from the following web page content. If there are multiple scholarships listed, extract each one of them:\n\n${textContent}`,
  });

  return object.scholarships;
}
