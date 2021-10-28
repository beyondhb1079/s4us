import React from 'react';
import Helmet from 'react-helmet';
import { render, screen } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { MemoryRouter, Route } from 'react-router-dom';
import { clearFirestoreData, initializeTestApp } from '../lib/testing';
import ViewScholarship from './ViewScholarship';
import Scholarships from '../models/Scholarships';
import ScholarshipAmount from '../types/ScholarshipAmount';

// hacky workaround to allow findBy to work
// TODO: Figure out a cleaner solution.
window.MutationObserver = require('mutation-observer');

function renderAtRoute(pathname, state = {}) {
  return render(
    <ThemeProvider theme={createTheme()}>
      <MemoryRouter initialEntries={[{ pathname, state }]}>
        <Route path="/scholarships/:id" component={ViewScholarship} />
      </MemoryRouter>
    </ThemeProvider>
  );
}

const app = initializeTestApp({ projectId: 'view-scholarships-test' });

beforeAll(() => clearFirestoreData(app.options));
afterAll(() => app.delete());

test('renders loading initially', () => {
  renderAtRoute('/scholarships/abc');

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('renders scholarship not found', () => {
  renderAtRoute('/scholarships/abc');

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  return expect(screen.findByText(/not found/i)).resolves.toBeInTheDocument();
});

test('renders loading initially with empty scholarship state', () => {
  renderAtRoute('/scholarships/abc', { scholarship: { id: 'abc' } });

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('renders something when scholarship data corrupt', () => {
  renderAtRoute('/scholarships/abc', {
    scholarship: { id: 'abc', data: { bad: 'data' } },
  });

  expect(screen.getByText(/Apply/i)).toBeInTheDocument();
});

test('renders passed in scholarship details', () => {
  const data = {
    name: 'Foo scholarship',
    amount: ScholarshipAmount.fixed(1000),
    description: 'description',
    deadline: new Date('2020-12-17'),
    website: 'http://foo.com/',
  };

  renderAtRoute('/scholarships/passed-in', {
    scholarship: { id: 'abc', data },
  });

  expect(screen.getByText(data.name)).toBeInTheDocument();
  expect(
    screen.getByText(ScholarshipAmount.toString(data.amount))
  ).toBeInTheDocument();
  expect(screen.getByText(data.description)).toBeInTheDocument();
  expect(
    screen.getByText(data.deadline.toLocaleDateString())
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Apply/i }).href).toBe(data.website);
  expect(Helmet.peek().title).toBe(data.name);
});

test('renders scholarship details', async () => {
  const data = {
    name: 'Foo scholarship',
    amount: ScholarshipAmount.fixed(1000),
    description: 'description',
    deadline: new Date('2020-12-17'),
    website: 'http://foo.com/',
    requirements: {
      states: ['California', 'Washington'],
      gpa: 4.0,
      ethnicities: ['Latino', 'African American'],
      majors: ['Computer Science', 'Software Engineering'],
    },
  };
  const ref = Scholarships.collection.doc('abc');
  await ref.set(data);

  renderAtRoute('/scholarships/abc');
  await screen.findByText(/Scholarship/i);
  expect(screen.getByText(data.name)).toBeInTheDocument();
  expect(
    screen.getByText(ScholarshipAmount.toString(data.amount))
  ).toBeInTheDocument();
  expect(screen.getByText(data.description)).toBeInTheDocument();
  expect(
    screen.getByText(data.deadline.toLocaleDateString())
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Apply/i }).href).toBe(data.website);
  expect(Helmet.peek().title).toBe(data.name);
  expect(
    screen.getByText(data.requirements.states.join(', '))
  ).toBeInTheDocument();
  expect(screen.getByText(data.requirements.gpa + '.0')).toBeInTheDocument();
  expect(
    screen.getByText(data.requirements.ethnicities.join(', '))
  ).toBeInTheDocument();
  expect(
    screen.getByText(data.requirements.majors.join(', '))
  ).toBeInTheDocument();
});
