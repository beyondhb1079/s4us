import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { initializeTestApp } from '../lib/testing';
import ProtectedRoute from './ProtectedRoute';

window.MutationObserver = require('mutation-observer');
const component = () => <h1>Protected Header</h1>;

function renderAtRoute(route) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <ProtectedRoute path={route} component={component} />
    </MemoryRouter>
  );
}

const app = initializeTestApp({
  projectId: 'protected-route-test',
  apiKey: 'fake-api-key',
  auth: { uid: '123', email: 'michaelmeyers@gmail.com' },
});

afterAll(() => app.delete());

test('authenticated user can accesss page', () => {
  renderAtRoute('/authenticated');

  expect(screen.getByText('Protected Header')).toBeInTheDocument();
});

test("unauthenticated user can't access page", () => {
  app.auth().signOut();

  renderAtRoute('/unauthenticated');

  expect(screen.getByText('Protected Header')).not.toBeInTheDocument();
});
