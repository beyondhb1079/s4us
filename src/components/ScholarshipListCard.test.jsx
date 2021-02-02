import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ScholarshipListCard from './ScholarshipListCard';

test('renders ScholarshipListCard', () => {
  const mockScholarship = {
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

  Object.entries(want).forEach(([_, v]) => {
    let value = v;
    if (typeof v === 'object') {
      value = v.toLocaleDateString();
    }
    expect(screen.getByText(value)).toBeInTheDocument();
  });
});
