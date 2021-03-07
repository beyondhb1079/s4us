import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// hacky workaround to allow findBy to work
// TODO: Figure out a cleaner solution..
window.MutationObserver = require('mutation-observer');

test('renders home page by default', () => {
  render(<App />);
  return expect(
    screen.findByText(/Scholarships/i)
  ).resolves.toBeInTheDocument();
});
