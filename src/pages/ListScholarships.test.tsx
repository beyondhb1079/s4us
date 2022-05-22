import React, { Suspense } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { initializeTestEnv } from '../lib/testing';
import ListScholarships from './ListScholarships';
import Scholarships from '../models/Scholarships';
import ScholarshipAmount from '../types/ScholarshipAmount';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { ScholarshipsProvider } from '../models/ScholarshipsContext';

// hacky workaround to allow findBy to work
// TODO: Figure out a cleaner solution.
window.MutationObserver = require('mutation-observer');

function renderAtRoute(route: string) {
  return render(
    <Suspense fallback="loading">
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={createTheme()}>
          <ScholarshipsProvider>
            <MemoryRouter initialEntries={[route]}>
              <Routes>
                <Route path="/scholarships" element={<ListScholarships />} />
              </Routes>
            </MemoryRouter>
          </ScholarshipsProvider>
        </ThemeProvider>
      </I18nextProvider>
    </Suspense>
  );
}

const [env, cleanup] = initializeTestEnv('list-scholarships-test');

beforeAll(() => env.then((e) => e.clearFirestore()));
afterAll(() => cleanup());

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

test('renders a list of scholarships', async () => {
  const data = {
    name: 'Foo scholarship',
    amount: ScholarshipAmount.fixed(1000),
    description: 'Foo description',
    deadline: new Date('3020-12-17'),
    website: 'foo.com',
  };
  const ref = Scholarships.id('abc', data);
  await ref.save();

  renderAtRoute('/scholarships');

  await screen.findByText(data.name);
  expect(screen.getByText(data.description)).toBeInTheDocument();
  expect(
    screen.getByText(data.deadline.toLocaleDateString())
  ).toBeInTheDocument();
});

test('does not render expired scholarships by default', async () => {
  const data = {
    name: 'Expired scholarship',
    amount: ScholarshipAmount.fixed(1000),
    description: 'Expired description',
    deadline: new Date('2020-12-17'),
    website: 'expired.com',
  };
  const ref = Scholarships.id('abc-expired', data);
  await ref.save();

  renderAtRoute('/scholarships');

  await screen.findByText('End of results');
  expect(screen.queryByText(data.name)).not.toBeInTheDocument();
});
