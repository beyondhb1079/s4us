import { render } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormikAutocomplete from './FormikAutocomplete';
import userEvent from '@testing-library/user-event';

const renderWithTheme = (ui: JSX.Element) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

const formikWithValue = { values: { names: ['bar', 'foo'] } };

test('renders options', () => {
  const { getByText, getAllByRole, getByRole } = renderWithTheme(
    <FormikAutocomplete
      id="names"
      formik={formikWithValue}
      label="my label"
      options={['bar', 'baz', 'foo']}
    />
  );

  expect(getByText('my label')).toBeInTheDocument();
  expect(getByRole('combobox')).toHaveAttribute('id', 'names');
  expect(
    getAllByRole('button')
      .map((e) => e.textContent)
      .filter((s) => s?.length > 0)
  ).toEqual(['bar', 'foo']);
});

test('freeSolo trimmed entry', async () => {
  const user = userEvent.setup();
  const formik = { values: { names: [] } };
  (formik as any).setFieldValues = (id: string, vals: string[]) =>
    ((formik as any).values[id] = vals);
  const { getAllByRole, getByRole } = renderWithTheme(
    <FormikAutocomplete
      id="names"
      formik={formik}
      label="my label"
      options={['bar', 'baz', 'foo']}
      freeSolo
    />
  );

  // HACKY FIX: DEFINE MISSING getSelection() FUNCTION
  getByRole('combobox').ownerDocument.getSelection = () => null;
  await user
    .click(getByRole('combobox'))
    .then(() => user.keyboard('  custom [Enter]'));

  expect(
    getAllByRole('button')
      .map((e) => e.textContent)
      .filter((s) => s?.length > 0)
  ).toEqual(['custom']);
  expect(formik.values.names).toEqual(['custom']);
});

test('freeSolo multiple entries', async () => {
  const user = userEvent.setup();
  const formik = { values: { names: [] } };
  (formik as any).setFieldValues = (id: string, vals: string[]) =>
    ((formik as any).values[id] = vals);
  const { getAllByRole, getByRole } = renderWithTheme(
    <FormikAutocomplete
      id="names"
      formik={formik}
      label="my label"
      options={['bar', 'baz', 'foo']}
      freeSolo
    />
  );

  // HACKY FIX: DEFINE MISSING getSelection() FUNCTION
  getByRole('combobox').ownerDocument.getSelection = () => null;
  await user
    .click(getByRole('combobox'))
    .then(() => user.keyboard('custom1, custom2 [Enter]'));

  expect(
    getAllByRole('button')
      .map((e) => e.textContent)
      .filter((s) => s?.length > 0)
  ).toEqual(['custom1', 'custom2']);
  expect(formik.values.names).toEqual(['custom1', 'custom2']);
});
