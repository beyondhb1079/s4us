import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { clearFirestoreData, initializeTestApp } from '../lib/testing';
import ListScholarships from './ListScholarships';
import Scholarships from '../models/Scholarships';
import ScholarshipAmount from '../types/ScholarshipAmount';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/setup';
import { ScholarshipsProvider } from '../models/ScholarshipsContext';

// hacky workaround to allow findBy to work
// TODO: Figure out a cleaner solution.
window.MutationObserver = require('mutation-observer');

function renderAtRoute(route) {
  return render(
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
  );
}

const app = initializeTestApp({ projectId: 'list-scholarships-test' });

beforeAll(() => clearFirestoreData(app.options));
afterAll(() => app.delete());

test('renders a list of scholarships', async () => {
  const data = {
    name: 'Foo scholarship',
    amount: ScholarshipAmount.fixed(1000),
    description: 'Foo description',
    deadline: new Date('3020-12-17'),
    website: 'foo.com',
  };
  const ref = Scholarships.collection.doc('abc');
  await ref.set(data);

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
  const ref = Scholarships.collection.doc('abc-expired');
  await ref.set(data);

  renderAtRoute('/scholarships');

  await screen.findByText('End of results');
  expect(screen.queryByText(data.name)).not.toBeInTheDocument();
});
