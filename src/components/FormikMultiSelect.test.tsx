import { render } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormikMultiSelect from './FormikMultiSelect';

const renderWithTheme = (ui: JSX.Element) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

const formikWithValue = { values: { names: ['bar', 'foo'] } };

test('renders options', () => {
  const { getByText, getByRole } = renderWithTheme(
    <FormikMultiSelect
      id="names"
      formik={formikWithValue}
      label="my label"
      options={{ bar: 'Bar soap', foo: 'Foo Fighters' }}
    />
  );

  expect(getByText('my label')).toBeInTheDocument();
  expect(getByRole('button')).toHaveAttribute('id', 'names');
  expect(getByRole('button').innerHTML).toBe('Bar soap, Foo Fighters');
});

// TODO(#1167): Add test case for onChange
