import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterBar from './FilterBar';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { act } from 'react-dom/test-utils';

afterAll(() => {
  jest.clearAllMocks();
});

function renderComponent(queryString = '') {
  return render(
    <Suspense fallback="loading">
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[queryString]}>
          <FilterBar openFilter={() => {}} />
        </MemoryRouter>
      </I18nextProvider>
    </Suspense>
  );
}

test('renders filters & sort button', async () => {
  renderComponent();
  await screen.findByText('Filters');
  expect(screen.getByText('Sort')).toBeInTheDocument();
});

test('sort options dropdown', async () => {
  const { findByRole, getAllByRole } = renderComponent();
  const sortBtn = await findByRole('button', { name: 'Sort' });
  await fireEvent.click(sortBtn);

  expect(getAllByRole('menuitem').map((i) => i.textContent)).toEqual([
    'Amount (Low to High)',
    'Amount (High to Low)',
    'Deadline (Earliest to Latest)',
    'Deadline (Latest to Earliest)',
  ]);
});

test('renders filters with # of filters applied', async () => {
  renderComponent('?grades[]=8,9&minAmount=400&majors[]=test');
  return expect(screen.findByText('Filters (4)')).resolves.toBeInTheDocument();
});

test('translated filters & sort button - Spanish', async () => {
  const { getByText } = renderComponent();
  await act(() => i18n.changeLanguage('es').then());

  expect(getByText('Filtros')).toBeInTheDocument();
  expect(getByText('Ordenar')).toBeInTheDocument();
});

test('translated sort options - Spanish', async () => {
  const { findByRole, getAllByRole } = renderComponent();
  const sortBtn = await findByRole('button', { name: 'Ordenar' });
  fireEvent.click(sortBtn);

  expect(getAllByRole('menuitem').map((i) => i.textContent)).toEqual([
    'Cantidad (menor a mayor)',
    'Cantidad (mayor a menor)',
    'Fecha límite (temprano a tarde)',
    'Fecha límite (tarde a temprano)',
  ]);
});
