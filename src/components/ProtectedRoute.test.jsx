import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { clearFirestoreData, initializeTestApp } from '../lib/testing';
import ScholarshipForm from '../pages/ScholarshipForm';

window.MutationObserver = require('mutation-observer');

function renderAtRoute(route) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Route path="/scholarships/new" component={ScholarshipForm} />
    </MemoryRouter>
  );
}

const app = initializeTestApp({
  projectId: 'protected-route-test',
  apiKey: 'fake-api-key',
});

beforeAll(() => clearFirestoreData(app.options));
afterAll(() => app.delete());

test('athenticated user can accesss page', () => {
  renderAtRoute('/scholarships/new');

  expect(screen.getByText(/Submit a Scholarship/i)).toBeInTheDocument();
  expect(screen.getByLabelText('Scholarship Name *')).toBeInTheDocument();
  expect(screen.getByLabelText('Deadline *')).toBeInTheDocument();
  expect(screen.getByLabelText('Description *')).toBeInTheDocument();
  expect(screen.getByLabelText('Website *')).toBeInTheDocument();

  expect(screen.getByText('Amount Type *')).toBeInTheDocument();
  expect(screen.getByText('Unknown')).toBeInTheDocument();
  expect(screen.getByText('Fixed Amount:')).toBeInTheDocument();
  // expect(screen.getByText('Range:')).toBeInTheDocument();
  expect(screen.getByText('Full Tuition')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /SUBMIT/i }));
});
