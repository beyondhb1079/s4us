import AmountType from '../types/AmountType';
import Ethnicity from '../types/Ethnicity';
import GradeLevel from '../types/GradeLevel';
import ScholarshipAmount from '../types/ScholarshipAmount';
import {
  lint,
  parseEthnicities,
  parseGradeLevels,
  parseMajors,
  parseMinGPA,
  parseSchools,
  parseStates,
} from './lint';

describe('parseMinGPA()', () => {
  test('returns null on no match', () =>
    [
      '',
      'sample description',
      'Your PA needs to be 2.5',
      'Need a GPA of 2.',
      'Impossible 5.0 GPA',
    ].forEach((d) => expect(parseMinGPA(d)).toBeNull()));

  test('matches GPA name variations', () =>
    [
      'GPA of 3.5',
      'G.P.A. of 3.5',
      'Title Cased Grade Point Average of 3.5',
      'lower case grade point average of 3.5',
    ].forEach((d) => {
      expect(parseMinGPA(d)?.phrase).toBe(d.replace('G.P.A.', 'GPA'));
      expect(parseMinGPA(d)?.value).toBe('3.5');
    }));

  test('matches minimum GPA value', () =>
    [
      'Min GPA of 3.0 out of 4.0',
      'Min GPA: High school 3.5, College 3.0',
      'Must have a GPA of 3.0 out of 4.0 or 4.0 out of 5.0',
      'GPAs of 3.0-3.5 encouraged to apply.',
    ].forEach((d) => expect(parseMinGPA(d)?.value).toBe('3.0')));

  test('splits on some special characters', () =>
    [
      ['like multiple, commas, min GPA of 3.0', 'min GPA of 3.0'],
      ['but not colons, min GPA: 3.0', 'min GPA: 3.0'],
      ['and not on G.P.A. E.g., G.P.A. of 3.0', 'GPA of 3.0'],
      ['but dashes yes - Min GPA: 2.0', 'Min GPA: 2.0'],
      ['and parentheses, min GPA 2.5 (out of 4.0)', 'min GPA 2.5'],
      ['and this: • have min GPA 2.5', 'have min GPA 2.5'],
    ].forEach(([d, want]) => expect(parseMinGPA(d)?.phrase).toBe(want)));
});

describe('parseGradeLevels()', () => {
  const { highSchoolers, undergrads, grads } = GradeLevel;
  test('matches keywords', () => {
    Object.entries({
      '7th grade or 8th grade': [GradeLevel.MiddleSchool],
      'middle school students': [GradeLevel.MiddleSchool],
      'specific grades - 9th grade, 10th grade, 11th grade, 12th grade':
        highSchoolers,
      'HS upperclassmen - high school juniors and seniors': [
        GradeLevel.HsJunior,
        GradeLevel.HsSenior,
      ],
      'freshmen or sophomores': [
        GradeLevel.CollegeFreshman,
        GradeLevel.CollegeSophomore,
      ],
      'college seniors. undergraduate juniors': [
        GradeLevel.CollegeJunior,
        GradeLevel.CollegeSenior,
      ],
      'specific graduate years - graduate students in their 2nd year and 3rd year.':
        [GradeLevel.GraduateSecondYear, GradeLevel.GraduateThirdYear],
    }).forEach(([d, want]) => expect(parseGradeLevels(d)).toEqual(want));
  });

  test('matches range keywords', () => {
    Object.entries({
      'any high school senior or undergraduate student can apply': [
        GradeLevel.HsSenior,
        ...undergrads,
      ],
      'high school students': highSchoolers,
      'students grade 9-12': highSchoolers,
      'any graduate students': grads,
    }).forEach(([d, want]) => expect(parseGradeLevels(d)).toEqual(want));
  });

  test('ignores range keywords in presence of more specific grade levels', () => {
    Object.entries({
      'undergraduate students completing their freshman year': [
        GradeLevel.CollegeFreshman,
      ],
      'graduate students in their 1st year': [GradeLevel.GraduateFirstYear],
    }).forEach(([d, want]) => expect(parseGradeLevels(d)).toEqual(want));
  });
});

describe('parseMajors()', () => {
  test('detects known majors', () => {
    expect(
      parseMajors('Accounting and fashion design majors may apply')
    ).toEqual(['Accounting', 'Fashion Design']);
  });
  test('does not detect unknown major', () => {
    expect(parseMajors('Welsh majors may apply')).toEqual([]);
  });
});

describe('parseSchools()', () => {
  test('detects known schools', () => {
    expect(
      parseSchools(
        'Student attending Florida State University or Georgia Institute of Technology may apply'
      ).map((s) => s.name)
    ).toEqual(['Florida State University', 'Georgia Institute of Technology']);
  });
  test('does not detect unknown school', () => {
    expect(parseSchools('Oxford University students')).toEqual([]);
  });
});

describe('parseStates()', () => {
  test('detects state names', () => {
    expect(
      parseStates('Must attend school in Alaska or Arizona').map((s) => s.abbr)
    ).toEqual(['AK', 'AZ']);
  });
  test('detects state abbreviations', () => {
    expect(
      parseStates('Students from these states may apply: CA, OR, WA.').map(
        (s) => s.abbr
      )
    ).toEqual(['CA', 'OR', 'WA']);
  });
  test('does not detect lowercased state abbrevations', () => {
    expect(parseStates('bAd abbrevations: Al, ca, wa, oR')).toEqual([]);
  });
});

describe('parseEthnicities()', () => {
  test('detects known ethnicities', () => {
    expect(parseEthnicities('Must be African American or Latino')).toEqual([
      Ethnicity.BlackOrAfricanAmerican,
      Ethnicity.HispanicOrLatino,
    ]);
  });
  test('does not detect unknown ethnicities', () => {
    expect(parseEthnicities('must be of Korean descent')).toEqual([]);
  });
});

const testScholarship = {
  name: 'test-scholarship',
  deadline: new Date(),
  description: 'this is a test scholarship',
  amount: {
    type: AmountType.Unknown,
    min: 0,
    max: 0,
  },
  website: 'foo.com',
};

const THIS_YEAR = new Date().getFullYear();

describe('lint()', () => {
  // School periods
  test('no outdated school periods', () =>
    [
      '',
      'sample description',
      `${THIS_YEAR}-${THIS_YEAR + 1}`,
      `Fall ${THIS_YEAR}`,
      `spring of ${THIS_YEAR}`,
    ].forEach((d) =>
      expect(lint({ ...testScholarship, description: d })).toEqual([])
    ));

  test('outdated school periods', () =>
    [
      'for the 2019-2020 school year',
      'attending college in fall of 2020',
      'attending college in spring 2020',
    ].forEach((d) =>
      expect(lint({ ...testScholarship, description: d })).toHaveLength(1)
    ));

  // Single descriptions with dashes
  test('no potential list item issues', () =>
    [
      'sample single line description',
      'single line with -single dash',
      'multiple lines\nwith -multiple -items in a single line',
    ].forEach((d) =>
      expect(lint({ ...testScholarship, description: d })).toEqual([])
    ));

  test('potential missing lines for list items', () =>
    ['multiple lines: -multiple -items'].forEach((d) =>
      expect(lint({ ...testScholarship, description: d })).toHaveLength(1)
    ));

  // Amounts
  const fullTuition = ScholarshipAmount.fullTuition();
  const unknown = ScholarshipAmount.unknown();
  const fixed500 = ScholarshipAmount.fixed(500);
  const range500to1000 = ScholarshipAmount.range(500, 1000);
  const max1000 = ScholarshipAmount.range(undefined, 1000);
  const min1000 = ScholarshipAmount.range(1000, undefined);
  test('no amount issues detected', () =>
    [
      [unknown, 'should not complain about unknown $500 description'],
      [fullTuition, 'nor if full tuition has $500 in description'],
      [fixed500, 'nor if a fixed description has no $ amount'],
      [fixed500, 'nor if fixed mentions the fixed $500 amount'],
      [fixed500, 'nor if fixed mentions $500 and something else like $1500'],
      [range500to1000, 'nor if range mentions min $500 and max $1000'],
      [range500to1000, 'nor if range mentions no $ amount'],
      [max1000, 'nor if max only mentions max $1000 amount'],
      [min1000, 'nor if min only mentions min $1000 amount'],
      [min1000, 'nor if min only mentions $1,000 with a comma'],
    ].forEach(([a, d]) =>
      expect(
        lint({
          ...testScholarship,
          amount: ScholarshipAmount.fromStorage(a as ScholarshipAmount),
          description: d as string,
        })
      ).toEqual([])
    ));
  test('amount issues detected', () =>
    [
      [fixed500, 'if fixed description mentions other amounts only like $234'],
      [range500to1000, 'if range mentions min $500 but not max'],
      [range500to1000, 'if range mentions max $1000 but not min'],
      [max1000, 'if max only mentions mentions other amounts like $234'],
      [min1000, 'if min only mentions other amounts like $234'],
    ].forEach(([a, d]) =>
      expect(
        lint({
          ...testScholarship,
          amount: ScholarshipAmount.fromStorage(a as ScholarshipAmount),
          description: d as string,
        })
      ).toHaveLength(1)
    ));

  // GPA tests
  test('no deadline issue detected when no date found', () => {
    expect(lint({ ...testScholarship, description: 'foo bar' })).toEqual([]);
  });
  test('no deadline issue detected when date found in description', () =>
    [
      'the deadline is May 1',
      `the deadline is May 1, ${THIS_YEAR}`,
      'applications due 5/1',
      `deadline is 4/1/${THIS_YEAR}. You will be notified 5/1/${THIS_YEAR}`,
    ].forEach((d) =>
      expect(
        lint({
          ...testScholarship,
          deadline: new Date(`May 1 ${THIS_YEAR}`),
          description: d,
        })
      ).toEqual([])
    ));
  test('deadline seems mismatched', () =>
    [
      'submit by April 1',
      'due Jun 30',
      'due Jun 30 1921',
      'due June 30, 1921',
      'due May 2',
      `applications due May 1st, ${THIS_YEAR - 1}`,
      `applications due 5/1/${THIS_YEAR - 1}`,
    ].forEach((d) =>
      expect(
        lint({
          ...testScholarship,
          deadline: new Date(`May 1 ${THIS_YEAR}`),
          description: d,
        })
      ).toHaveLength(1)
    ));

  // GPA tests
  test('no min GPA issue detected when no GPA found', () => {
    expect(lint(testScholarship)).toEqual([]);
  });
  test('no min GPA issue detected when min GPA matches', () => {
    expect(
      lint({
        ...testScholarship,
        description: 'min GPA of 3.0',
        requirements: { gpa: 3.0 },
      })
    ).toEqual([]);
  });
  test('min GPA is missing', () => {
    expect(
      lint({
        ...testScholarship,
        description: 'min GPA of 3.0',
      })
    ).toHaveLength(1);
  });
  test('min GPA seems mismatched', () => {
    expect(
      lint({
        ...testScholarship,
        description: 'min GPA of 3.2',
        requirements: { gpa: 3.0 },
      })
    ).toHaveLength(1);
  });

  // Requirements
  test('no missing grade levels', () => {
    expect(
      lint({
        ...testScholarship,
        description: 'high school seniors only.',
        requirements: { grades: [GradeLevel.HsSenior] },
      })
    ).toEqual([]);
  });
  test('missing grade requirements', () => {
    expect(
      lint({
        ...testScholarship,
        description: 'any high school student.',
        requirements: { grades: [GradeLevel.HsSenior] },
      })
    ).toHaveLength(1);
  });
  test('no missing majors', () => {
    expect(
      lint({
        ...testScholarship,
        description: 'computer science majors only.',
        requirements: { majors: ['Computer Science'] },
      })
    ).toEqual([]);
  });
  test('missing majors', () => {
    expect(
      lint({
        ...testScholarship,
        description: 'computer science and computer engineering majors only.',
        requirements: { majors: ['Computer Science'] },
      })
    ).toHaveLength(1);
  });
  test('no missing schools', () => {
    expect(
      lint({
        ...testScholarship,
        description: 'Stanford University students.',
        requirements: { schools: ['Stanford University (CA)'] },
      })
    ).toEqual([]);
  });
  test('missing schools', () => {
    expect(
      lint({
        ...testScholarship,
        description: 'Harvard University or Stanford University students.',
        requirements: { schools: ['Stanford University (CA)'] },
      })
    ).toHaveLength(1);
  });
  test('no missing states', () => {
    expect(
      lint({
        ...testScholarship,
        description: 'college in Washington or Oregon.',
        requirements: { states: ['OR', 'WA'] },
      })
    ).toEqual([]);
  });
  test('missing state requirements', () => {
    expect(
      lint({
        ...testScholarship,
        description: 'college in California, Washington or Oregon.',
        requirements: { states: ['OR', 'WA'] },
      })
    ).toHaveLength(1);
  });
  test('no missing ethnicities', () => {
    expect(
      lint({
        ...testScholarship,
        description: 'Asian descent.',
        requirements: { ethnicities: [Ethnicity.Asian] },
      })
    ).toEqual([]);
  });
  test('missing ethnicity requirements', () => {
    expect(
      lint({
        ...testScholarship,
        description: 'Asian or Pacific Islander descent.',
        requirements: { ethnicities: [Ethnicity.Asian] },
      })
    ).toHaveLength(1);
  });
  // TODO(#858): Tests for other errors.
});
