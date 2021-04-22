import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ScholarshipListCard from './ScholarshipListCard';
import ScholarshipAmount from '../types/ScholarshipAmount';

test('renders ScholarshipListCard', () => {
  const mockScholarship = {
    id: '0',
    data: {
      deadline: new Date(),
      name: 'test scholarship',
      description: 'desc',
      organization: 'City of Seattle',
      amount: new ScholarshipAmount(),
    },
  };

  const want = mockScholarship;

  render(<ScholarshipListCard scholarship={mockScholarship} />, {
    wrapper: MemoryRouter,
  });

  Object.values(want.data).forEach((v) => {
    let value = v;
    if (v instanceof Date) {
      value = v.toLocaleDateString();
    }

    if (v instanceof ScholarshipAmount) {
      value = v.toString();
    }

    expect(screen.getByText(value)).toBeInTheDocument();
  });
});
