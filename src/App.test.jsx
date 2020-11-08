import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders home page by default', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/For and by the Community/i);
  expect(linkElement).toBeInTheDocument();
});
