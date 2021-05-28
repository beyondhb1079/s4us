import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { initializeTestApp } from '../lib/testing';
import Header from './Header';

initializeTestApp({ apiKey: 'fake-api-key' });

// hacky workaround to allow findBy to work
// TODO: Figure out a cleaner solution.
window.MutationObserver = require('mutation-observer');

test('does not render alert by default', async () => {
  delete window.location;
  window.location = new URL('https://www.example.com');

  render(<Header />, { wrapper: MemoryRouter });
  await screen.findByText('Login');

  const alertElement = screen.queryByText(/This is a preview/i);
  expect(alertElement).not.toBeInTheDocument();
});

test('renders alert on PR preview URL', async () => {
  delete window.location;
  window.location = new URL('https://s4us-pr-49.onrender.com/foo');

  render(<Header />, { wrapper: MemoryRouter });
  await screen.findByText('Login');

  const alertElement = screen.getByText(/This is a preview/i);
  expect(alertElement).toBeInTheDocument();
  const linkElement = screen.getByText(/Pull Request #49/i);
  expect(linkElement.href).toEqual(
    'https://github.com/beyondhb1079/s4us/pull/49'
  );
});
