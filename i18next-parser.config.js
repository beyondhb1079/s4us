export default {
  defaultValue: (_locale, _ns, key) =>
    key.substring(0, 1).toUpperCase() +
    key
      .substring(1)
      .replace(/([A-Z])/g, ' $1')
      .toLowerCase(),
  locales: ['en', 'es'],
  output: 'public/locales/$LOCALE/$NAMESPACE.json',
  input: 'src/**/*.{j,t}sx',
  sort: true,
};
