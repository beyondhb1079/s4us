import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ScholarshipList from './ScholarshipList';
import scholarships from '../testdata/scholarships';

test('renders a list of scholarships', () => {
  const want = scholarships;

  const { queryByText } = render(
    <ScholarshipList scholarships={scholarships} />,
    { wrapper: MemoryRouter }
  );

  want.forEach(({ data }) =>
    expect(queryByText(data.name)).toBeInTheDocument()
  );
});
