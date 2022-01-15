import AmountType from '../types/AmountType';
import ScholarshipAmount from '../types/ScholarshipAmount';
import { parseMinGPA, lint } from './lint';

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
describe('parseOutdatedSchoolPeriods()', () => {
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

  // TODO(#858): Tests for other errors.
});
