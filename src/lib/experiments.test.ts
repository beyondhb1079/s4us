import experiments, { loadExperiments } from './experiments';

test('disabled experiment disabled by default', () => {
  loadExperiments('');
  expect(experiments.expDummyDisabledByDefault).toBeFalsy();
});

test('disabled experiment enabled by URL parameter', () => {
  loadExperiments('?expDummyDisabledByDefault=1');
  expect(experiments.expDummyDisabledByDefault).toBeTruthy();
});

test('enabled experiment enabled by default', () => {
  loadExperiments('');
  expect(experiments.expDummyEnabledByDefault).toBeTruthy();
});

test('enabled experiment disabled by URL parameter', () => {
  loadExperiments('?expDummyEnabledByDefault=0');
  expect(experiments.expDummyEnabledByDefault).toBeFalsy();
});
