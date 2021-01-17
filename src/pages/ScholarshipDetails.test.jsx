import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { clearFirestoreData, initializeTestApp } from '../lib/testing';
import ScholarshipDetails from './ScholarshipDetails';
import Scholarships from '../models/Scholarships';
import ScholarshipAmount from '../types/ScholarshipAmount';
import AmountType from '../types/AmountType';

// hacky workaround to allow findBy to work
// TODO: Figure out a cleaner solution.
window.MutationObserver = require('mutation-observer');

function renderAtRoute(route, state = {}) {
  const history = createMemoryHistory();
  history.replace(route, state);
  return render(
    <Router history={history}>
      <Route path="/scholarships/:id" component={ScholarshipDetails} />
    </Router>
  );
}

const app = initializeTestApp({ projectId: 'scholarship-details-test' });

beforeAll(async () => clearFirestoreData(app.options));
afterAll(async () => app.delete());

test('renders loading initially', async () => {
  renderAtRoute('/scholarships/abc');

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  await screen.findByText(/not found/i);
});

test('renders scholarship not found', async () => {
  renderAtRoute('/scholarships/bad-id');

  await screen.findByText(/scholarships\/bad-id Not Found/i);
});

test('renders passed in scholarship details', async () => {
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

  await screen.findByText(data.name); //).toBeInTheDocument();
  expect(screen.getByText(data.amount.toString())).toBeInTheDocument();
  expect(screen.getByText(data.description)).toBeInTheDocument();
  expect(
    screen.getByText(data.deadline.toLocaleDateString())
  ).toBeInTheDocument();
  expect(screen.getByRole('button').href).toBe(data.website);
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
  expect(screen.getByRole('button').href).toBe(data.website);
  expect(document.title).toContain(data.name);
});
