/** Utility methods for linting scholarship information and detecting errors. */

import AmountType from '../types/AmountType';
import Ethnicity from '../types/Ethnicity';
import GradeLevel from '../types/GradeLevel';
import ScholarshipAmount from '../types/ScholarshipAmount';
import { MAJORS, School, SCHOOLS, State, STATES } from '../types/options';
import ScholarshipData from '../types/ScholarshipData';

/** Custom match object to provide additional context outside of a value. */
interface MatchInfo {
  /** Phrase where a value was detected. */
  phrase: string;
  /** Value detected. */
  value: string;
}

/** Parses the given description looking for a minimum GPA value. Returns a MatchInfo if found. */
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

/** Parses the given description for ethnicities and returns matches. */
export function parseGradeLevels(desc: string): GradeLevel[] {
  const lowerDesc = desc.toLowerCase();
  const keywords = {
    [GradeLevel.MiddleSchool]: ['middle school', '[78]th grade'],
    [GradeLevel.HsFreshman]: ['9th grade'],
    [GradeLevel.HsSophomore]: ['10th grade'],
    [GradeLevel.HsJunior]: ['11th grade', 'high school[^.]* junior'],
    [GradeLevel.HsSenior]: ['12th grade', 'high school[^.]* senior'],
    [GradeLevel.CollegeFreshman]: ['freshm[ae]n'],
    [GradeLevel.CollegeSophomore]: ['sophomore'],
    [GradeLevel.CollegeJunior]: ['(college|undergraduate)[^.]* junior'],
    [GradeLevel.CollegeSenior]: ['(college|undergraduate)[^.]* senior'],
    [GradeLevel.GraduateFirstYear]: ['graduate[^.]* (1st|first) year'],
    [GradeLevel.GraduateSecondYear]: ['graduate[^.]* (2nd|second) year'],
    [GradeLevel.GraduateThirdYear]: ['graduate[^.]* (3rd|third) year'],
    [GradeLevel.GraduateFourthYear]: ['graduate[^.]* (4th|fouth) year'],
    [GradeLevel.GraduateFifthYear]: ['graduate[^.]* (5th|fifth) year'],
  };
  const matches = new Set(
    GradeLevel.keys().filter((g) =>
      keywords[g].some((k) => lowerDesc.match(new RegExp(k)))
    )
  );

  // Search for keywords belong to whole groups of students, ignoring them
  // if we've already detected more specific grade levels for that group.
  const { highSchoolers, undergrads, grads } = GradeLevel;
  if (desc.match(/8(th)?-12(th)?/)) {
    [GradeLevel.MiddleSchool, ...highSchoolers].forEach((g) => matches.add(g));
  } else if (
    desc.match(/9(th)?-12(th)?/) ||
    lowerDesc.includes('high school student')
  ) {
    highSchoolers.forEach((g) => matches.add(g));
  }

  if (
    !undergrads.some((g) => matches.has(g)) &&
    desc.match(/(college (undergraduate|student)|undergraduate[^.]* student)/i)
  ) {
    undergrads.forEach((g) => matches.add(g));
  }

  if (!grads.some((g) => matches.has(g)) && desc.match(/\Wgraduate student/i)) {
    grads.forEach((g) => matches.add(g));
  }

  return Array.from(matches);
}

/** Parses the given description for majors and returns the ones found. */
export function parseMajors(desc: string): string[] {
  return Array.from(MAJORS).filter((m) =>
    desc.toLowerCase().includes(m.toLowerCase())
  );
}

/** Parses the given description for schools and returns matches. */
export function parseSchools(desc: string): School[] {
  return SCHOOLS.filter(({ name }) => desc.includes(name));
}

/** Parses the given description for states and returns matches. */
export function parseStates(desc: string): State[] {
  return STATES.filter(
    ({ name, abbr }) =>
      desc.includes(name) || desc.match(new RegExp('\\W' + abbr + '\\W'))
  );
}

/** Parses the given description for ethnicities and returns matches. */
export function parseEthnicities(desc: string): Ethnicity[] {
  const keywords = {
    [Ethnicity.AmericanIndianOrAlaskaNative]: [
      'Alaskan Native',
      'American Indian',
      'Native American',
    ],
    [Ethnicity.Asian]: ['Asian'],
    [Ethnicity.BlackOrAfricanAmerican]: ['African', 'Black'],
    [Ethnicity.HispanicOrLatino]: ['Hispanic', 'Latino'],
    [Ethnicity.NativeHawaiianOrOtherPacificIslander]: [
      'Hawaiian',
      'Pacific Islander',
    ],
    [Ethnicity.White]: ['Caucasian', 'White'],
  };
  // "White House" does not correspond to a race lol.
  return (Object.keys(Ethnicity.values()) as Ethnicity[]).filter((e) =>
    keywords[e].some((k) => desc.replace('White House', 'WH').includes(k))
  );
}

/** Lints the given scholarship for mismatches and returns a list of errors as strings. */
export function lint(scholarship: ScholarshipData): String[] {
  const { amount, description: desc, requirements: reqs } = scholarship;
  const { ethnicities, grades, majors, schools, states } = reqs || {};
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

  // Look for potentially missing requirements
  const missingGrades = parseGradeLevels(desc).filter(
    (g) => !grades?.includes(g)
  );
  if (missingGrades.length) {
    issues.push(
      `Potentially missing grade level requirements: ${JSON.stringify(
        missingGrades.map(GradeLevel.toString)
      )}`
    );
  }
  const missingMajors = parseMajors(desc).filter((m) => !majors?.includes(m));
  if (missingMajors.length) {
    issues.push(
      `Potentially missing major requirements: ${JSON.stringify(missingMajors)}`
    );
  }
  const missingSchools = parseSchools(desc).filter(
    ({ name, state }) => !schools?.includes(`${name} (${state})`)
  );
  if (missingSchools.length) {
    issues.push(
      `Potentially missing school requirements: ${JSON.stringify(
        missingSchools.map((s) => `${s.name} (${s.state})`)
      )}`
    );
  }
  const missingStates = parseStates(desc).filter(
    ({ abbr }) => !states?.includes(abbr)
  );
  if (missingStates.length) {
    issues.push(
      `Potentially missing state requirements: ${JSON.stringify(
        missingStates.map((s) => s.abbr)
      )}`
    );
  }
  const missingEthnicites = parseEthnicities(desc).filter(
    (e) => !ethnicities?.includes(e)
  );
  if (missingEthnicites.length) {
    issues.push(
      `Potentially missing ethnicity requirements: ${JSON.stringify(
        missingEthnicites.map(Ethnicity.toString)
      )}`
    );
  }

  // TODO(#858): Detect more errors.
  return issues;
}
