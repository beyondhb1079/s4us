import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders home page by default', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Home Page/i);
  expect(linkElement).toBeInTheDocument();
});
