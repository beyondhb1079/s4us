// Add your experiment below
const experiments: { [k: string]: boolean } = {
  expDummyDisabledByDefault: false,
  expDummyEnabledByDefault: true,
  expShowFullProfileMenu: false,
  expShowSlider: false,
};

export function loadExperiments(query = window.location.search): void {
  const params = new URLSearchParams(query);
  Object.entries(experiments).forEach(([k, defaultState]) => {
    let state = defaultState as boolean;
    if (params.has(k)) {
      if (params.get(k) === '1') {
        state = true;
        if (process.env.NODE_ENV !== 'test') {
          // eslint-disable-next-line no-console
          console.log(`experiments.${k} explicitly enabled`);
        }
      } else if (params.get(k) === '0') {
        state = false;
        // eslint-disable-next-line no-console
        if (process.env.NODE_ENV !== 'test') {
          console.log(`experiments.${k} explicitly disabled`);
        }
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    experiments[k] = state;
  });
}
loadExperiments();

export default experiments;
