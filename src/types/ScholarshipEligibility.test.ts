import ScholarshipEligibility from './ScholarshipEligibility';

test('construct default', () => {
  const eligibility = new ScholarshipEligibility(3.5, [], []);

  expect(eligibility.GPA).toBe(3.5);
  expect(eligibility.ethnicities).toBe('');
  expect(eligibility.majors).toBe('');
});

test('contruct - ethnicities, majors only one element', () => {
  const eligibility = new ScholarshipEligibility(3.5, ['Any'], ['Any']);

  expect(eligibility.ethnicities).toBe('Any');
  expect(eligibility.majors).toBe('Any');
});

test('contruct - ethnicities, majors more than one element', () => {
  const eligibility = new ScholarshipEligibility(
    3.5,
    ['Asian', 'Latino', 'American'],
    ['State_1', 'State_2']
  );

  expect(eligibility.ethnicities).toBe('Asian, Latino, American');
  expect(eligibility.majors).toBe('State_1, State_2');
});
