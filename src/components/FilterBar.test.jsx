import { render, screen } from '@testing-library/react';
import queryString from 'query-string';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FilterBar from './FilterBar';

const renderWithTheme = (ui) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

const queryOptions = {
  arrayFormat: 'bracket-separator',
  arrayFormatSeparator: ',',
};

const params = queryString.parse(
  { sortBy: 'amount.asc' },
  {
    parseNumbers: true,
    ...queryOptions,
  }
);

const setQueryParam = () => {};

describe('HomeSection', () => {
  test('renders the component', () => {
    renderWithTheme(<FilterBar queryParams={params} {...{ setQueryParam }} />);
  });
  test('checks the number of buttons', () => {
    renderWithTheme(<FilterBar queryParams={params} {...{ setQueryParam }} />);
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(2);
  });
  test('check the name of the button', () => {
    renderWithTheme(<FilterBar queryParams={params} {...{ setQueryParam }} />);
    expect(screen.getByText('Amount')).toBeInTheDocument();
  });
});
