import AmountType from '../types/AmountType';
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

describe('lint()', () => {
  // GPA tests
  test('No min GPA issue detected when no GPA found', () => {
    expect(lint(testScholarship)).toEqual([]);
  });
  test('No min GPA issue detected when min GPA matches', () => {
    expect(
      lint({
        ...testScholarship,
        description: 'min GPA of 3.0',
        requirements: { gpa: 3.0 },
      })
    ).toEqual([]);
  });
  test('Min GPA is missing', () => {
    expect(
      lint({
        ...testScholarship,
        description: 'min GPA of 3.0',
      })
    ).toHaveLength(1);
  });
  test('Min GPA seems mismatched', () => {
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
