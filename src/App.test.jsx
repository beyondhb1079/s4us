import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// hacky workaround to allow findBy to work
// TODO: Figure out a cleaner solution..
window.MutationObserver = require('mutation-observer');

test('renders home page by default', () => {
  render(<App />);

  const linkElement = screen.findByText(/Scholarships/i);
  return expect(linkElement).resolves.toBeInTheDocument();
});
