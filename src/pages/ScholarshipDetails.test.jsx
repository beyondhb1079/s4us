import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Routes from '../Routes';

function renderAtRoute(route) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes />
    </MemoryRouter>,
  );
}

test('renders scholarship details', () => {
  const { queryByText } = renderAtRoute('/scholarships/1');
  expect(queryByText(/Scholarship 1/i))
    .toBeInTheDocument();
  expect(queryByText(/Scholarship Not Found/i))
    .toBeNull();
});

test('renders scholarship not found', () => {
  const { queryByText } = renderAtRoute('/scholarships/bad');
  expect(queryByText(/Scholarship Not Found/i))
    .toBeInTheDocument();
});
