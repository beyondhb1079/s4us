/** Utility methods for linting scholarship information and detecting errors. */

import AmountType from '../types/AmountType';
import ScholarshipAmount from '../types/ScholarshipAmount';
import ScholarshipData from '../types/ScholarshipData';

interface MatchInfo {
  /** Phrase where a value was detected. */
  phrase: string;
  /** Value detected. */
  value: string;
}

/** Parses the given description looking for a minimum GPA value. Returns a MatchInfo if found.*/
export function parseMinGPA(desc: string): MatchInfo | null {
  if (
    desc.includes('GPA') ||
    desc.includes('G.P.A.') ||
    desc.toLowerCase().includes('grade point average')
  ) {
    const matches = desc.match(/[0-4]\.[0-9]+/g);
    if (matches) {
      const minGPA = matches.sort()[0];
      const phrases = desc
        .replaceAll('G.P.A.', 'GPA') // So we don't parse the letters as "phrases".
        .replaceAll('. ', ', ') // So we can split on sentences without splitting decimals.
        .split(/[,;\-()•]/)
        .filter((s) => s.includes(minGPA));

      return { phrase: phrases[0].trim(), value: minGPA };
    }
  }
  return null;
}

const THIS_YEAR = new Date().getFullYear();

/** Returns a list of strings that seem to match outdated school periods. */
export function parseOutdatedSchoolPeriods(desc: string): string[] {
  return (desc.match(/\d{4}-\d{4}/g) || [])
    .concat(desc.match(/(fall|winter|spring)( of)? \d{4}/gi) || [])
    .filter((s) => !s.includes(THIS_YEAR.toString()));
}

/** Lints the given scholarship for mismatches and returns a list of errors as strings. */
export function lint(scholarship: ScholarshipData): String[] {
  const { amount, description: desc, requirements: reqs } = scholarship;
  const issues = [];
  const gpaMatch = parseMinGPA(desc);

  const outdatedSchoolPeriods = parseOutdatedSchoolPeriods(desc);
  if (outdatedSchoolPeriods.length) {
    issues.push(
      `Description mentions outdated school periods: ${JSON.stringify(
        outdatedSchoolPeriods
      )}`
    );
  }
  const amountMatches = desc.match(/\$[0-9,]+/g) || [];
  if (
    amountMatches.length &&
    (amount.type === AmountType.Fixed || amount.type === AmountType.Varies) &&
    ((amount.min && !desc.includes(amount.min.toString())) ||
      (amount.max && !desc.includes(amount.max.toString())))
  ) {
    const want = ScholarshipAmount.toString(amount);
    issues.push(
      `Amount specified as ${want} but found other amounts in description: ${JSON.stringify(
        amountMatches
      )}.`
    );
  }
  if (gpaMatch) {
    const parsedVal = Number.parseFloat(gpaMatch.value);
    if (!reqs?.gpa) {
      issues.push(
        `No GPA requirement specified but found: "${gpaMatch.phrase}"`
      );
    } else if (reqs.gpa !== parsedVal) {
      issues.push(
        `Min GPA requirement is set to ${reqs.gpa} but seems to be ${parsedVal} per: "${gpaMatch.phrase}"`
      );
    }
  }
  // TODO(#858): Detect more errors.
  return issues;
}
