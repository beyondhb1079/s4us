import experiments, { loadExperiments } from './experiments';

test('disabled experiment disabled by default', () => {
  loadExperiments('');
  expect(experiments.enableDummyDisabledByDefault).toBeFalsy();
});

test('disabled experiment enabled by URL parameter', () => {
  loadExperiments('?enableDummyDisabledByDefault=1');
  expect(experiments.enableDummyDisabledByDefault).toBeTruthy();
});

test('enabled experiment enabled by default', () => {
  loadExperiments('');
  expect(experiments.enableDummyEnabledByDefault).toBeTruthy();
});

test('enabled experiment disabled by URL parameter', () => {
  loadExperiments('?enableDummyEnabledByDefault=0');
  expect(experiments.enableDummyEnabledByDefault).toBeFalsy();
});
