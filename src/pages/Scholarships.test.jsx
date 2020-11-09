import React from 'react';
import { render, waitFor } from '@testing-library/react';
import firebase from 'firebase';
import { clearFirestoreData } from '@firebase/rules-unit-testing';
import { MemoryRouter, Route } from 'react-router-dom';
import ScholarshipsPage from './Scholarships';
import Scholarships from '../models/Scholarships';

// hacky workaround to allow waitFor to work
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
    amount: 1000,
    description: 'Foo description',
    deadline: new Date('2020-12-17'),
    website: 'foo.com',
  };
  const ref = Scholarships.collection.doc('abc');
  await ref.set(data);

  const { queryByText } = renderAtRoute('/scholarships');
  await waitFor(() => expect(queryByText(data.name)).toBeTruthy());

  expect(queryByText(/Foo scholarship/i)).toBeInTheDocument();
  expect(queryByText('Foo description')).toBeInTheDocument();
  expect(queryByText(data.deadline.toLocaleDateString())).toBeInTheDocument();
});
