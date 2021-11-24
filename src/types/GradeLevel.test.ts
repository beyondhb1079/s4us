import GradeLevel from './GradeLevel';

test('check Grade key values', () => {
  const keys = [];
  for (let k = 8; k <= 22; k++) keys.push(k);

  expect(GradeLevel.keys()).toEqual(keys);
});

test('toString() - middle school', () => {
  expect(GradeLevel.toString(8)).toEqual('Middle School');
});

test('toString() - high school', () => {
  expect(GradeLevel.toString(9)).toEqual('High School Freshman');
  expect(GradeLevel.toString(10)).toEqual('High School Sophomore');
  expect(GradeLevel.toString(11)).toEqual('High School Junior');
  expect(GradeLevel.toString(12)).toEqual('High School Senior');
});

test('toString() - College', () => {
  expect(GradeLevel.toString(13)).toEqual('College Freshman');
  expect(GradeLevel.toString(14)).toEqual('College Sophomore');
  expect(GradeLevel.toString(15)).toEqual('College Junior');
  expect(GradeLevel.toString(16)).toEqual('College Senior');
  expect(GradeLevel.toString(17)).toEqual('College 5th Year');
});

test('toString() - Graduate', () => {
  expect(GradeLevel.toString(18)).toEqual('Graduate 1st Year');
  expect(GradeLevel.toString(19)).toEqual('Graduate 2nd Year');
  expect(GradeLevel.toString(20)).toEqual('Graduate 3rd Year');
  expect(GradeLevel.toString(21)).toEqual('Graduate 4th Year');
  expect(GradeLevel.toString(22)).toEqual('Graduate 5th Year');
});

test('includesGrade() - no grades', () => {
  const paramGrades = [8, 10, 15];
  expect(GradeLevel.includesGrade(undefined, paramGrades)).toBe(true);
});

test('includesGrade() - no grade query params', () => {
  const grades = [8, 10, 15];
  expect(GradeLevel.includesGrade(grades, undefined)).toBe(true);
});

test('includesGrade() - grade in param grades', () => {
  const grades = [9, 10, 20];
  const paramGrades = [8, 10, 15];
  expect(GradeLevel.includesGrade(grades, paramGrades)).toBe(true);
});

test('includesGrade() - grade not in param grades', () => {
  const grades = [7, 13, 14];
  const paramGrades = [8, 10, 15];
  expect(GradeLevel.includesGrade(grades, paramGrades)).toBe(false);
});

test('includesGrade() - grades set to []', () => {
  const grades = [] as number[];
  const paramGrades = [8, 10, 15];
  expect(GradeLevel.includesGrade(grades, paramGrades)).toBe(false);
});
