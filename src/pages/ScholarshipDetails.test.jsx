import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import firebase from 'firebase';
import { clearFirestoreData } from '@firebase/rules-unit-testing';
import { MemoryRouter, Route } from 'react-router-dom';
import ScholarshipDetails from './ScholarshipDetails';
import Scholarships from '../models/Scholarships';
import ScholarshipAmount from '../types/ScholarshipAmount';
import AmountType from '../types/AmountType';

// hacky workaround to allow waitFor to work
// TODO: Figure out a cleaner solution.
window.MutationObserver = require('mutation-observer');

function renderAtRoute(route) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Route path="/scholarships/:id" component={ScholarshipDetails} />
    </MemoryRouter>
  );
}

const app = firebase.initializeApp({ projectId: 'scholarship-details-test' });
app.firestore().settings({
  host: 'localhost:8080',
  ssl: false,
});

beforeAll(async () => clearFirestoreData(app.options));
afterAll(async () => app.delete());

test('renders loading initially', () => {
  const { queryByText } = renderAtRoute('/scholarships/abc');

  expect(queryByText(/loading/i)).toBeTruthy();
});

test('renders scholarship not found', async () => {
  const { getByText } = renderAtRoute('/scholarships/bad-id');

  await waitFor(() => expect(getByText(/not found/i)));

  expect(getByText(/Scholarships\/bad-id Not Found/i)).toBeInTheDocument();
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
});
