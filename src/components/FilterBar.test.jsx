import { render, screen } from '@testing-library/react';
import queryString from 'query-string';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FilterBar from './FilterBar';

const renderWithTheme = (ui) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

const params = { sortBy: 'amount.asc' };
const setQueryParam = () => {};

describe('FilterBar', () => {
  test('SortBy filter (deadline.asc) rendered', () => {
    const params = { sortBy: 'deadline.asc' };
    renderWithTheme(<FilterBar queryParams={params} {...{ setQueryParam }} />);
    expect(
      screen.getByText('Deadline (Earliest to Latest)')
    ).toBeInTheDocument();
  });
  test('SortBy filter (deadline.desc) rendered', () => {
    const params = { sortBy: 'deadline.desc' };
    renderWithTheme(<FilterBar queryParams={params} {...{ setQueryParam }} />);
    expect(
      screen.getByText('Deadline (Latest to Earliest)')
    ).toBeInTheDocument();
  });
  test('SortBy filter (amount.desc) rendered', () => {
    const params = { sortBy: 'amount.desc' };
    renderWithTheme(<FilterBar queryParams={params} {...{ setQueryParam }} />);
    expect(screen.getByText('Amount (High to Low)')).toBeInTheDocument();
  });
  test('SortBy filter (amount.asc) rendered', () => {
    const params = { sortBy: 'amount.asc' };
    renderWithTheme(<FilterBar queryParams={params} {...{ setQueryParam }} />);
    expect(screen.getByText('Amount (Low to High)')).toBeInTheDocument();
  });

  test('checks the number of buttons', () => {
    renderWithTheme(<FilterBar queryParams={params} {...{ setQueryParam }} />);
    const buttons = screen.queryAllByRole('button');
    expect(buttons).toHaveLength(2);
  });
  test('Amount filter rendered', () => {
    renderWithTheme(<FilterBar queryParams={params} {...{ setQueryParam }} />);
    expect(screen.getByText('Amount')).toBeInTheDocument();
  });
});
