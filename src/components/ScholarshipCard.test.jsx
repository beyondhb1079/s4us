import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
      amount: ScholarshipAmount.unknown(),
    },
  };

  const want = mockScholarship;

  render(
    <ThemeProvider theme={createTheme()}>
      <ScholarshipListCard scholarship={mockScholarship} />
    </ThemeProvider>,
    {
      wrapper: MemoryRouter,
    }
  );

  Object.entries(want.data).forEach(([k, v]) => {
    let value = v;
    if (k === 'deadline') {
      value = v.toLocaleDateString();
    }

    if (k === 'amount') {
      value = ScholarshipAmount.toString(v);
    }

    expect(screen.getByText(value)).toBeInTheDocument();
  });
});
