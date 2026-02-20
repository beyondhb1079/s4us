// Add your experiment below
const experiments: { [k: string]: boolean } = {
  expDummyDisabledByDefault: false,
  expDummyEnabledByDefault: true,
  expShowFullProfileMenu: false,
};

export function loadExperiments(query = window.location.search): void {
  const params = new URLSearchParams(query);
  Object.entries(experiments).forEach(([k, defaultState]) => {
    let state = defaultState as boolean;
    if (params.has(k)) {
      if (params.get(k) === '1') {
        state = true;
        if (process.env.NODE_ENV !== 'test') {
          console.log(`experiments.${k} explicitly enabled`);
        }
      } else if (params.get(k) === '0') {
        state = false;
        if (process.env.NODE_ENV !== 'test') {
          console.log(`experiments.${k} explicitly disabled`);
        }
      }
    }
    experiments[k] = state;
  });
}
loadExperiments();

export default experiments;
