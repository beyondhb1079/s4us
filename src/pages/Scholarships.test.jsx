import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import Scholarships from './Scholarships';

function renderAtRoute(route) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Route path="/scholarships" component={Scholarships} />
    </MemoryRouter>,
  );
}

test('renders a list of scholarships', () => {
  const path = '/scholarships';

  const { queryByText } = renderAtRoute(path);

  expect(queryByText(/scholarship 1/i)).toBeInTheDocument();
  expect(queryByText(/scholarship 2/i)).toBeInTheDocument();
});
