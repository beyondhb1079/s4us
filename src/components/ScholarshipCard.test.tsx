import React, { Suspense } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ScholarshipCard from './ScholarshipCard';
import ScholarshipAmount from '../types/ScholarshipAmount';
import { clearFirestoreData, initializeTestApp } from '../lib/testing';
import i18n from '../i18n';
import { I18nextProvider } from 'react-i18next';

const app = initializeTestApp({ projectId: 'scholarship-card-test' });
beforeAll(() => clearFirestoreData(app.options));
afterAll(() => app.delete());

const renderCard = (scholarship, options) =>
  render(
    <Suspense fallback="loading">
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={createTheme()}>
          <ScholarshipCard scholarship={scholarship} />
        </ThemeProvider>
      </I18nextProvider>
    </Suspense>,
    options
  );

test('renders basics', () => {
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

  renderCard(mockScholarship, {
    wrapper: MemoryRouter,
  });

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

// TODO(#705): Add more tests for detailed views and previews
// and whether the edit button renders
