import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import ScholarshipDetails from './ScholarshipDetails';
import scholarships from '../testdata/scholarships';

function renderAtRoute(route) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Route path="/scholarships/:id" component={ScholarshipDetails} />
    </MemoryRouter>,
  );
}

test('renders scholarship details', () => {
  const path = '/scholarships/1';
  const want = scholarships[1];

  const { queryByText } = renderAtRoute(path);

  Object.keys(want).forEach((k) => expect(queryByText(String(want[k]))).toBeInTheDocument());
  expect(queryByText(/Scholarship Not Found/i)).toBeNull();
});

test('renders scholarship not found', () => {
  const { queryByText } = renderAtRoute('/scholarships/bad');
  expect(queryByText(/Scholarship Not Found/i)).toBeInTheDocument();
});
