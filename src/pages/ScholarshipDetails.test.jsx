import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { clearFirestoreData, initializeTestApp } from '../lib/testing';
import ScholarshipDetails from './ScholarshipDetails';
import Scholarships from '../models/Scholarships';
import ScholarshipAmount from '../types/ScholarshipAmount';
import AmountType from '../types/AmountType';

// hacky workaround to allow findBy to work
// TODO: Figure out a cleaner solution.
window.MutationObserver = require('mutation-observer');

function renderAtRoute(pathname, state = {}) {
  return render(
    <MemoryRouter initialEntries={[{ pathname, state }]}>
      <Route path="/scholarships/:id" component={ScholarshipDetails} />
    </MemoryRouter>
  );
}

const app = initializeTestApp({ projectId: 'scholarship-details-test' });

beforeAll(async () => clearFirestoreData(app.options));
afterAll(async () => app.delete());

test('renders loading initially', () => {
  renderAtRoute('/scholarships/abc');

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('renders scholarship not found', async () => {
  renderAtRoute('/scholarships/abc');

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  await screen.findByText(/not found/i);
});

test('renders loading initially with empty scholarship state', () => {
  renderAtRoute('/scholarships/abc', { scholarship: { id: 'abc' } });

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('renders something when scholarship data corrupt', () => {
  renderAtRoute('/scholarships/abc', {
    scholarship: { id: 'abc', data: { bad: 'data' } },
  });

  // expect(screen.getByText(/Apply/i)).toBeInTheDocument();
});

test('renders passed in scholarship details', () => {
  const data = {
    name: 'Foo scholarship',
    amount: new ScholarshipAmount({
      type: AmountType.Fixed,
      min: 1000,
      max: 1000,
    }),
    description: 'description',
    deadline: new Date('2020-12-17'),
    website: 'http://foo.com/',
  };

  renderAtRoute('/scholarships/passed-in', {
    scholarship: { id: 'abc', data },
  });

  expect(screen.getByText(data.name)).toBeInTheDocument();
  expect(screen.getByText(data.amount.toString())).toBeInTheDocument();
  expect(screen.getByText(data.description)).toBeInTheDocument();
  expect(
    screen.getByText(data.deadline.toLocaleDateString())
  ).toBeInTheDocument();
  // expect(screen.getByRole('button').href).toBe(data.website);
  expect(document.title).toContain(data.name);
});

test('renders scholarship details', async () => {
  const data = {
    name: 'Foo scholarship',
    amount: new ScholarshipAmount({
      type: AmountType.Fixed,
      min: 1000,
      max: 1000,
    }),
    description: 'description',
    deadline: new Date('2020-12-17'),
    website: 'http://foo.com/',
  };
  const ref = Scholarships.collection.doc('abc');
  await ref.set(data);

  renderAtRoute('/scholarships/abc');
  await screen.findByText(/Scholarship/i);

  expect(screen.getByText(data.name)).toBeInTheDocument();
  expect(screen.getByText(data.amount.toString())).toBeInTheDocument();
  expect(screen.getByText(data.description)).toBeInTheDocument();
  expect(
    screen.getByText(data.deadline.toLocaleDateString())
  ).toBeInTheDocument();
  // expect(screen.getByRole('button').href).toBe(data.website);
  expect(document.title).toContain(data.name);
});
