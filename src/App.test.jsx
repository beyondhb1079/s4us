import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// hacky workaround to allow findBy to work
// TODO: Figure out a cleaner solution..
window.MutationObserver = require('mutation-observer');
window.scrollTo = jest.fn();

afterAll(() => {
  jest.clearAllMocks();
});

test('renders home page by default', () => {
  render(<App />);

  const linkElements = screen.findAllByText(/Scholarships/i);
  return expect(linkElements).resolves.not.toHaveLength(0);
});
