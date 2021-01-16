// Add your experiment below
const experiments: { [k: string]: boolean } = {
  enableDummyDisabledByDefault: false,
  enableDummyEnabledByDefault: true,
};

export function loadExperiments(query = window.location.search): void {
  const params = new URLSearchParams(query);
  Object.entries(experiments).forEach(([k, defaultState]) => {
    let state = defaultState as boolean;
    if (params.has(k)) {
      if (params.get(k) === '1') {
        state = true;
        // eslint-disable-next-line no-console
        console.log(`experiments.${k} explicitly enabled`);
      } else if (params.get(k) === '0') {
        state = false;
        // eslint-disable-next-line no-console
        console.log(`experiments.${k} explicitly disabled`);
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    experiments[k] = state;
  });
}

export default experiments;
