import MutationObserver from 'mutation-observer';
import React, { Suspense } from 'react';
import Helmet from 'react-helmet';
import { render, screen, waitFor } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { initializeTestEnv } from '../lib/testing';
import ViewScholarship from './ViewScholarship';
import Scholarships from '../models/Scholarships';
import { ScholarshipAmountInfo } from '../types/ScholarshipAmount';
import GradeLevel, { GradeLevelInfo } from '../types/GradeLevel';
import Ethnicity, { EthnicityInfo } from '../types/Ethnicity';
import State from '../types/States';
import i18n from '../i18n';
import { I18nextProvider } from 'react-i18next';
import { ScholarshipsProvider } from '../models/ScholarshipsContext';
import { act } from 'react-dom/test-utils';

// hacky workaround to allow findBy to work
// TODO: Figure out a cleaner solution.
window.MutationObserver = MutationObserver;

function renderAtRoute(pathname: string, state = {}) {
  return render(
    <Suspense fallback="loading">
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={createTheme()}>
          <ScholarshipsProvider>
            <MemoryRouter initialEntries={[{ pathname, state }]}>
              <Routes>
                <Route path="/scholarships/:id" element={<ViewScholarship />} />
              </Routes>
            </MemoryRouter>
          </ScholarshipsProvider>
        </ThemeProvider>
      </I18nextProvider>
    </Suspense>,
  );
}

const [env, cleanup] = initializeTestEnv('view-scholarships-test');

beforeAll(() => env.then((e) => e.clearFirestore()));
afterAll(() => cleanup());

test('renders loading initially', () => {
  renderAtRoute('/scholarships/abc');

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('renders scholarship not found', () => {
  renderAtRoute('/scholarships/abc');

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  return expect(screen.findByText(/not found/i)).resolves.toBeInTheDocument();
});

test('renders passed in scholarship details', async () => {
  const data = {
    name: 'Foo scholarship',
    amount: ScholarshipAmountInfo.fixed(1000),
    description: 'Foo description',
    deadline: new Date(),
  };

  renderAtRoute('/scholarships/passed-it', {
    scholarship: { id: 'passed-it', data },
  });

  await waitFor(() => expect(screen.getByText(data.name)).toBeInTheDocument());
  expect(
    screen.getByText(ScholarshipAmountInfo.toString(data.amount)),
  ).toBeInTheDocument();
  expect(screen.getByText(data.description)).toBeInTheDocument();
  expect(
    screen.getByText(data.deadline.toLocaleDateString()),
  ).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Apply/i })).toBeInTheDocument();
  expect(Helmet.peek().title).toBe(data.name);
});

test('renders scholarship details', async () => {
  const data = {
    name: 'Foo scholarship',
    amount: ScholarshipAmountInfo.fixed(1000),
    description: 'description',
    deadline: new Date('2020-12-17'),
    website: 'http://foo.com/',
    requirements: {
      states: ['CA', 'WA'],
      gpa: 4.0,
      grades: [GradeLevel.HsFreshman, GradeLevel.HsSophomore],
      ethnicities: [
        Ethnicity.HispanicOrLatino,
        Ethnicity.BlackOrAfricanAmerican,
      ],
      majors: ['Computer Science', 'Software Engineering'],
      schools: ['Cal Tech', 'MIT', 'LSU'],
    },
  };
  const ref = Scholarships.id('load-it', data);
  await act(() => ref.save().then());

  renderAtRoute('/scholarships/load-it');
  await screen.findByText(/Foo scholarship/i);
  expect(screen.getByText(data.name)).toBeInTheDocument();
  expect(
    screen.getByText(ScholarshipAmountInfo.toString(data.amount)),
  ).toBeInTheDocument();
  expect(screen.getByText(data.description)).toBeInTheDocument();
  expect(
    screen.getByText(data.deadline.toLocaleDateString()),
  ).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Apply/i })).toBeInTheDocument();
  expect(Helmet.peek().title).toBe(data.name);
  data.requirements.states
    .map(State.toString)
    .forEach((s) => expect(screen.getByText(s)).toBeInTheDocument());
  expect(screen.getByText(data.requirements.gpa + '.0')).toBeInTheDocument();
  data.requirements.grades
    .map(GradeLevelInfo.toString)
    .forEach((g) => expect(screen.getByText(g)).toBeInTheDocument());
  data.requirements.ethnicities
    .map(EthnicityInfo.toString)
    .forEach((e) => expect(screen.getByText(e)).toBeInTheDocument());
  data.requirements.majors.forEach((m) =>
    expect(screen.getByText(m)).toBeInTheDocument(),
  );
  data.requirements.schools.forEach((s) =>
    expect(screen.getByText(s)).toBeInTheDocument(),
  );
});
