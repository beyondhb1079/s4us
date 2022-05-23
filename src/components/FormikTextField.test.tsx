import { render } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormikTextField from './FormikTextField';

const renderWithTheme = (ui: JSX.Element) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

const formikWithValue = { values: { foo: 'my value' } };
const formikWithError = { errors: { foo: 'my error' } };

test('renders value', () => {
  const { getByText, getByRole } = renderWithTheme(
    <FormikTextField id="foo" formik={formikWithValue} label="my label" />
  );

  expect(getByText('my label')).toBeInTheDocument();
  expect(getByRole('textbox')).toHaveAttribute('id', 'foo');
  expect(getByRole('textbox')).toHaveAttribute('value', 'my value');
});

test('renders error', () => {
  const { getByText, getByRole } = renderWithTheme(
    <FormikTextField id="foo" formik={formikWithError} label="my label" />
  );

  expect(getByText('my label')).toBeInTheDocument();
  expect(getByRole('textbox')).toHaveAttribute('id', 'foo');
  expect(getByText('my error')).toBeInTheDocument();
});

// TODO(#1168): Add test case for formik.handleChange
