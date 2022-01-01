import React from 'react';
import { render, screen } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { MemoryRouter } from 'react-router-dom';
import ScholarshipList from './ScholarshipList';
import scholarships from '../testdata/scholarships';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/setup';

// hacky workaround to allow findBy to work
// TODO: Figure out a cleaner solution.
window.MutationObserver = require('mutation-observer');

const renderWithTheme = (ui, options) =>
  render(
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>
    </I18nextProvider>,
    options
  );

const fakeNoResults = new Promise((resolve) => {
  resolve({ results: [], next: undefined, hasNext: false });
});
const fakeSinglePageResults = new Promise((resolve) => {
  resolve({ results: scholarships, next: undefined, hasNext: false });
});
const fakeFirstPageOfManyResults = new Promise((resolve) => {
  resolve({ results: scholarships, next: undefined, hasNext: true });
});

test('renders no results', async () => {
  renderWithTheme(<ScholarshipList listFn={() => fakeNoResults} />, {
    wrapper: MemoryRouter,
  });

  expect(screen.getByTestId('progress')).toBeInTheDocument();

  expect(await screen.findByText(/No scholarships found/i)).toBeInTheDocument();
});

test('renders custom no results node', async () => {
  renderWithTheme(
    <ScholarshipList
      listFn={() => fakeNoResults}
      noResultsNode={<Button>Oh no</Button>}
    />,
    {
      wrapper: MemoryRouter,
    }
  );

  const button = await screen.findByRole('button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent('Oh no');
});

test('renders results with load more', async () => {
  const want = scholarships;

  renderWithTheme(
    <ScholarshipList listFn={() => fakeFirstPageOfManyResults} />,
    {
      wrapper: MemoryRouter,
    }
  );

  expect(await screen.findByText('Load More')).toBeInTheDocument();
  want.forEach(({ data }) =>
    expect(screen.getByText(data.name)).toBeInTheDocument()
  );
});

test('renders results without load more', async () => {
  const want = scholarships;

  renderWithTheme(<ScholarshipList listFn={() => fakeSinglePageResults} />, {
    wrapper: MemoryRouter,
  });

  expect(await screen.findByText('End of results')).toBeInTheDocument();
  want.forEach(({ data }) =>
    expect(screen.getByText(data.name)).toBeInTheDocument()
  );
  expect(screen.queryByText('Load More')).not.toBeInTheDocument();
});
