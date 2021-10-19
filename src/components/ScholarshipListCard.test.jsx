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
      amount: new ScholarshipAmount(),
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

  Object.values(want.data).forEach((v) => {
    let value = v;
    if (v instanceof Date) {
      value = v.toLocaleDateString();
    }

    if (v instanceof ScholarshipAmount) {
      value = ScholarshipAmount.toString(v);
    }

    expect(screen.getByText(value)).toBeInTheDocument();
  });
});
