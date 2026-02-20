import React, { Suspense } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import GradeLevelFilter from './GradeLevelFilter';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { act } from 'react-dom/test-utils';
import GradeLevel from '../types/GradeLevel';

function renderComponent(grades = new Set<GradeLevel>()) {
  return render(
    <Suspense fallback="loading">
      <I18nextProvider i18n={i18n}>
        <GradeLevelFilter grades={grades} onChange={() => {}} />
      </I18nextProvider>
    </Suspense>,
  );
}

test('renders grade groups', async () => {
  renderComponent();

  await waitFor(() =>
    expect(screen.getByText('Middle School')).toBeInTheDocument(),
  );
  expect(screen.getByText('High School')).toBeInTheDocument();
  expect(screen.getByText('College/University')).toBeInTheDocument();
  expect(screen.getByText('Postgraduate')).toBeInTheDocument();
});

test('renders translated grade groups - Spanish', async () => {
  renderComponent();
  await act(() => i18n.changeLanguage('es').then());

  expect(screen.getByText('Secundaria')).toBeInTheDocument();
  expect(screen.getByText('Preparatoria')).toBeInTheDocument();
  expect(screen.getByText('Colegio/Universidad')).toBeInTheDocument();
  expect(screen.getByText('Postgrado')).toBeInTheDocument();
});

test('renders checkmarks for applicable grades', async () => {
  renderComponent(new Set([9, 13, 18]));

  await waitFor(() =>
    expect(screen.getByRole('checkbox', { name: '9th Grade' })).toBeChecked(),
  );
  expect(screen.getByRole('checkbox', { name: 'Freshman' })).toBeChecked();
  expect(screen.getByRole('checkbox', { name: '1st Year' })).toBeChecked();
});
