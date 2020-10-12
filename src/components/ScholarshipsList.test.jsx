import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import ScholarshipList from './ScholarshipList';
import scholarships from '../testdata/scholarships';

test('renders a list of scholarships', () => {
  const want = scholarships;

  const { queryByText } = render(<ScholarshipList scholarships={scholarships} />, {wrapper: MemoryRouter});

  Object.entries(want).forEach(([k, v]) => expect(queryByText(v.name)).toBeInTheDocument());
});
