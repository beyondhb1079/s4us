import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page by default', () => {
  render(<App />);
  const linkElement = screen.getByText(/Scholarships/i);
  expect(linkElement).toBeInTheDocument();
});
