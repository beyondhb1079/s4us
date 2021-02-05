import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ScholarshipListCard from './ScholarshipListCard';

test('renders ScholarshipListCard', () => {
  const mockScholarship = {
    deadline: new Date(),
    name: 'test scholarship',
    description: 'desc',
    organization: 'City of Seattle',
    amount: {
      // mock toString func for amount type
      toString: () => 'unknow amount',
    },
  };

  const want = mockScholarship;

  render(<ScholarshipListCard scholarship={mockScholarship} id={0} />, {
    wrapper: MemoryRouter,
  });

  Object.entries(want).forEach(([_, v]) => {
    let value = v;
    // check for deadline type
    if (v instanceof Date) {
      value = v.toLocaleDateString();
    }

    // check for amount type
    if (v.toString && !v.toLocaleDateString) {
      value = v.toString();
    }

    expect(screen.getByText(value)).toBeInTheDocument();
  });
});
