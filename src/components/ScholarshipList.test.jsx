import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '@material-ui/core/Button';
import { MemoryRouter } from 'react-router-dom';
import ScholarshipList from './ScholarshipList';
import scholarships from '../testdata/scholarships';

// hacky workaround to allow findBy to work
// TODO: Figure out a cleaner solution.
window.MutationObserver = require('mutation-observer');

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
  render(<ScholarshipList listFn={() => fakeNoResults} />, {
    wrapper: MemoryRouter,
  });

  expect(screen.getByTestId('progress')).toBeInTheDocument();

  expect(await screen.findByText(/no scholarships found/i)).toBeInTheDocument();
});

test('renders custom no results node', async () => {
  render(
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

  render(<ScholarshipList listFn={() => fakeFirstPageOfManyResults} />, {
    wrapper: MemoryRouter,
  });

  expect(await screen.findByText('Load More')).toBeInTheDocument();
  want.forEach(({ data }) =>
    expect(screen.getByText(data.name)).toBeInTheDocument()
  );
});

test('renders results without load more', async () => {
  const want = scholarships;

  render(<ScholarshipList listFn={() => fakeSinglePageResults} />, {
    wrapper: MemoryRouter,
  });

  expect(await screen.findByText('End of results')).toBeInTheDocument();
  want.forEach(({ data }) =>
    expect(screen.getByText(data.name)).toBeInTheDocument()
  );
  expect(screen.queryByText('Load More')).not.toBeInTheDocument();
});
