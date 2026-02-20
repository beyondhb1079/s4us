import MutationObserver from 'mutation-observer';
import React, { Suspense } from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { MemoryRouter } from 'react-router-dom';
import ScholarshipList from './ScholarshipList';
import Scholarships from '../models/Scholarships';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { initializeTestEnv } from '../lib/testing';
import { ScholarshipsProvider } from '../models/ScholarshipsContext';
import ScholarshipAmount, {
  ScholarshipAmountInfo,
} from '../types/ScholarshipAmount';

const [env, cleanup] = initializeTestEnv('scholarship-list-test');
beforeEach(() => env.then((e) => e.clearFirestore()));
afterAll(() => cleanup());

// hacky workaround to allow findBy to work
// TODO: Figure out a cleaner solution.
window.MutationObserver = MutationObserver;

const renderWithProviders = (ui: JSX.Element) =>
  render(
    <Suspense fallback="loading">
      <I18nextProvider i18n={i18n}>
        <ScholarshipsProvider>
          <ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>
        </ScholarshipsProvider>
      </I18nextProvider>
    </Suspense>,
    { wrapper: MemoryRouter },
  );

// https://stackoverflow.com/a/62148101
beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  window.IntersectionObserver = class {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  } as any;
});

test('renders no results', async () => {
  renderWithProviders(<ScholarshipList />);

  expect(await screen.findByText(/No scholarships found/i)).toBeInTheDocument();
});

test('renders custom no results node', async () => {
  renderWithProviders(
    <ScholarshipList noResultsNode={<Button>Oh no</Button>} />,
  );

  const button = await screen.findByRole('button');
  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent('Oh no');
});

test('renders end of results', async () => {
  const data = {
    name: 'Foo scholarship',
    amount: ScholarshipAmountInfo.fixed(1000),
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
