import React from 'react';
import { render, screen } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { MemoryRouter } from 'react-router-dom';
import ScholarshipList from './ScholarshipList';
import Scholarships from '../models/Scholarships';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/setup';
import { clearFirestoreData, initializeTestApp } from '../lib/testing';
import { ScholarshipsProvider } from '../models/ScholarshipsContext';
import ScholarshipAmount from '../types/ScholarshipAmount';

const app = initializeTestApp({ projectId: 'scholarship-list-test' });
beforeEach(() => clearFirestoreData(app.options));
afterAll(() => app.delete());

// hacky workaround to allow findBy to work
// TODO: Figure out a cleaner solution.
window.MutationObserver = require('mutation-observer');

const renderWithProviders = (ui) =>
  render(
    <I18nextProvider i18n={i18n}>
      <ScholarshipsProvider>
        <ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>
      </ScholarshipsProvider>
    </I18nextProvider>,
    { wrapper: MemoryRouter }
  );

// https://stackoverflow.com/a/62148101
beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

test('renders no results', async () => {
  renderWithProviders(<ScholarshipList />);

  expect(screen.getByTestId('progress')).toBeInTheDocument();

  expect(await screen.findByText(/No scholarships found/i)).toBeInTheDocument();
});

test('renders custom no results node', async () => {
  renderWithProviders(
    <ScholarshipList noResultsNode={<Button>Oh no</Button>} />
  );

  const button = await screen.findByRole('button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent('Oh no');
});

test('renders end of results', async () => {
  const data = {
    name: 'Foo scholarship',
    amount: ScholarshipAmount.fixed(1000),
    description: 'Foo description',
    deadline: new Date('3020-12-17'),
    website: 'foo.com',
  };
  await Scholarships.new(data).save();

  renderWithProviders(<ScholarshipList />);

  expect(await screen.findByText('End of results')).toBeInTheDocument();
  expect(screen.getByText(data.name)).toBeInTheDocument();
  expect(screen.queryByText('Load More')).not.toBeInTheDocument();
});
