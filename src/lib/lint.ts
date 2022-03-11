/** Utility methods for linting scholarship information and detecting errors. */

import AmountType from '../types/AmountType';
import Ethnicity from '../types/Ethnicity';
import GradeLevel from '../types/GradeLevel';
import ScholarshipAmount from '../types/ScholarshipAmount';
import { MAJORS, School, SCHOOLS } from '../types/options';
import State, { STATES } from '../types/States';
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

/** Parses the given description for grade levels and returns matches. */
export function parseGradeLevels(desc: string): GradeLevel[] {
  const lowerDesc = desc.toLowerCase();
  const keywords = {
    [GradeLevel.MiddleSchool]: ['middle school', '[78]th grade'],
    [GradeLevel.HsFreshman]: ['9th grade'],
    [GradeLevel.HsSophomore]: ['10th grade'],
    [GradeLevel.HsJunior]: ['11th grade', 'high school[^.]* junior'],
    [GradeLevel.HsSenior]: [
      '12th grade',
      'high school[^.]* senior',
      'graduating senior[^.]* high school',
      'seniors? (in|at|graduating)[^.]* high school',
    ],
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

  if (!lowerDesc.includes('high school')) {
    // These most likely refer to college level
    if (lowerDesc.match('junior')) {
      matches.add(GradeLevel.CollegeJunior);
    }
    if (lowerDesc.match('senior')) {
      matches.add(GradeLevel.CollegeSenior);
    }
  }

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
  // Be better about false positives with single words
  // major, degree, fields? of study
  // higher education,
  // These might dilute results with majors that are also common words.
  const falsePositives = [
    'higher education',
    'work history',
    'academic history',
    'history of',
  ];
  const sanitizedDesc = falsePositives.reduce(
    (s, fp) => s.replaceAll(fp, ''),
    desc.toLowerCase()
  );

  const majors = Array.from(MAJORS).filter((m) =>
    sanitizedDesc.match(new RegExp('(\\W|^)' + m.toLowerCase() + '(\\W|$)'))
  );

  // Coming across these words, common words like "history" and "education"
  // are more likely to be major requirements.
  const intentionalKeywords = [
    'major',
    'degree',
    'department',
    'field of study',
    'fields of study',
  ];

  // Try to get rid of false positives
  if (
    majors.length === 1 &&
    ['Education', 'History'].includes(majors[0]) &&
    !intentionalKeywords.some((s) => sanitizedDesc.includes(s))
  ) {
    // It's probably just noise.
    return [];
  }
  return majors;
}

function acronym(name: string): string {
  return (name.match(/([A-Z])/g) || []).join('');
}

/** Parses the given description for schools and returns matches. */
export function parseSchools(desc: string, url?: string): School[] {
  return SCHOOLS.filter(({ name }) => desc.includes(name)).concat(
    SCHOOLS.filter(
      ({ name, website }) =>
        url?.includes('//' + website) && desc.includes(acronym(name))
    )
  );
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

const dateRe =
  /((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\.? (\d+)(st|nd|rd|th)?(,? \d{4})?)|\d{1,2}\/\d{1,2}\/\d{2,4}/gi;

export function lintReqs(scholarship: ScholarshipData): any {
  const { description: desc, website, requirements } = scholarship;
  const { ethnicities, grades, majors, schools, states } = requirements || {};
  const messages: string[] = [];
  const reqs: Record<string, any> = {};

  const matchedGpa = parseMinGPA(desc);
  const missingGrades = parseGradeLevels(desc).filter(
    (g) => !grades?.includes(g)
  );
  const missingSchools = parseSchools(desc, website).filter(
    ({ name, state }) => !schools?.includes(`${name} (${state})`)
  );
  const missingStates = parseStates(desc).filter(
    ({ abbr }) => !states?.includes(abbr)
  );
  const missingMajors = parseMajors(desc).filter((m) => !majors?.includes(m));
  const missingEthnicites = parseEthnicities(desc).filter(
    (e) => !ethnicities?.includes(e)
  );

  if (matchedGpa) {
    const parsedVal = Number.parseFloat(matchedGpa.value);
    if (!requirements?.gpa) {
      messages.push(
        `No GPA requirement specified but found: "${matchedGpa.phrase}"`
      );
    } else if (requirements.gpa !== parsedVal) {
      messages.push(
        `Min GPA requirement is set to ${reqs.gpa} but seems to be ${parsedVal} per: "${matchedGpa.phrase}"`
      );
    }
    reqs.gpa = parsedVal;
  }

  if (missingGrades.length) {
    messages.push(
      `Potentially missing grade level requirements: ${JSON.stringify(
        missingGrades.map(GradeLevel.toString)
      )}`
    );
    reqs.grades = missingGrades;
  }

  if (missingSchools.length) {
    messages.push(
      `Potentially missing school requirements: ${JSON.stringify(
        missingSchools.map((s) => `${s.name} (${s.state})`)
      )}`
    );
    reqs.schools = missingSchools.map(
      ({ name, state }) => `${name} (${state})`
    );
  }

  if (missingStates.length) {
    messages.push(
      `Potentially missing state requirements: ${JSON.stringify(
        missingStates.map((s) => s.abbr)
      )}`
    );
    reqs.states = missingStates.map((s) => s.abbr);
  }

  if (missingMajors.length) {
    messages.push(
      `Potentially missing major requirements: ${JSON.stringify(missingMajors)}`
    );
    reqs.majors = missingMajors;
  }

  if (missingEthnicites.length) {
    messages.push(
      `Potentially missing ethnicity requirements: ${JSON.stringify(
        missingEthnicites.map(Ethnicity.toString)
      )}`
    );
    reqs.ethnicities = missingEthnicites;
  }

  return { messages, reqs };
}

/** Lints the given scholarship for mismatches and returns a list of errors as strings. */
export function lint(scholarship: ScholarshipData): String[] {
  const { amount, deadline, description: desc } = scholarship;
  const issues = [];

  const outdatedSchoolPeriods = parseOutdatedSchoolPeriods(desc);
  if (outdatedSchoolPeriods.length) {
    issues.push(
      `Description mentions outdated school periods: ${JSON.stringify(
        outdatedSchoolPeriods
      )}`
    );
  }
  if (!desc.includes('\n') && (desc.match(/ -/g)?.length ?? 0) > 1) {
    issues.push(
      'Decription is a single line but contains several "-" characters. Should those be separate lines?'
    );
  }
  const amountMatches =
    desc.match(/\$[0-9,]+/g)?.map((s) => s.replace(',', '')) || [];
  if (
    amountMatches.length &&
    (amount.type === AmountType.Fixed || amount.type === AmountType.Varies) &&
    ((amount.min && !amountMatches.includes('$' + amount.min.toString())) ||
      (amount.max && !amountMatches.includes('$' + amount.max.toString())))
  ) {
    const want = ScholarshipAmount.toString(amount);
    issues.push(
      `Amount specified as ${want} but found other amounts in description: ${JSON.stringify(
        amountMatches
      )}.`
    );
  }
  const dateMatches =
    desc.match(dateRe)?.filter((d) => Date.parse(d) !== Number.NaN) || [];
  if (
    dateMatches?.length > 0 &&
    !dateMatches
      .map((d) =>
        // For MM/DD matches add the year if missing.
        d.includes('/') && !d.match(/\d+\/\d+\/\d+/) ? `${d}/${THIS_YEAR}` : d
      )
      .map((d) =>
        // For MM DD matches add the year if missing.
        !d.includes('/') && !d.match(/(,? \d{4})/) ? `${d}, ${THIS_YEAR}` : d
      )
      .map((d) => new Date(d).toLocaleDateString())
      .includes(deadline.toLocaleDateString())
  ) {
    issues.push(
      `Deadline specified is ${deadline.toLocaleDateString()} but other dates were found: ${JSON.stringify(
        dateMatches
      )}.`
    );
  }

  // TODO(#858): Detect more errors.
  return [...issues, ...lintReqs(scholarship).messages];
}
