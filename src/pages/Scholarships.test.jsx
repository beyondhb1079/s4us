import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import firebase from 'firebase';
import { clearFirestoreData } from '@firebase/rules-unit-testing';
import { MemoryRouter, Route } from 'react-router-dom';
import ScholarshipsPage from './Scholarships';
import Scholarships from '../models/Scholarships';
import ScholarshipAmount from '../types/ScholarshipAmount';
import AmountType from '../types/AmountType';

// hacky workaround to allow findBy to work
// TODO: Figure out a cleaner solution.
window.MutationObserver = require('mutation-observer');

function renderAtRoute(route) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Route path="/scholarships" component={ScholarshipsPage} />
    </MemoryRouter>
  );
}

const app = firebase.initializeApp({ projectId: 'scholarships-test' });
app.firestore().settings({
  host: 'localhost:8080',
  ssl: false,
});

beforeAll(async () => clearFirestoreData(app.options));
afterAll(async () => app.delete());

test('renders a list of scholarships', async () => {
  const data = {
    name: 'Foo scholarship',
    amount: new ScholarshipAmount({
      min: 1000,
      max: 1000,
      type: AmountType.Fixed,
    }),
    description: 'Foo description',
    deadline: new Date('2020-12-17'),
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
