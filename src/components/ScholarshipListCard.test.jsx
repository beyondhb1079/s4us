import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ScholarshipListCard from './ScholarshipListCard';

test('renders ScholarshipListCard', () => {
  let mockScholarship = {
    deadline: new Date(),
    name: 'test scholarship',
    description: 'desc',
    city: 'City of Seattle',
    amount: '$1,000',
  };

  const want = mockScholarship;

  render(<ScholarshipListCard scholarship={mockScholarship} id={0} />, {
    wrapper: MemoryRouter,
  });

  for (let [_, value] of Object.entries(want)) {
    if (typeof value == 'object') {
      value = value.toLocaleDateString();
    }
    expect(screen.getByText(value)).toBeInTheDocument();
  }
});
