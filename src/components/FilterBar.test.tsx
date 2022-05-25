import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import FilterBar from './FilterBar';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { act } from 'react-dom/test-utils';

afterAll(() => {
  jest.clearAllMocks();
});

function renderComponent(filterParams = '') {
  return render(
    <Suspense fallback="loading">
      <I18nextProvider i18n={i18n}>
        <MemoryRouter initialEntries={[filterParams]}>
          <FilterBar openFilter={() => {}} />
        </MemoryRouter>
      </I18nextProvider>
    </Suspense>
  );
}

test('renders filters & sort button', async () => {
  renderComponent();
  await waitFor(() => expect(screen.getByText('Filters')).toBeInTheDocument());
  expect(screen.getByText('Sort')).toBeInTheDocument();
});

test('sort options dropdown', async () => {
  renderComponent();
  const sortBtn = await screen.findByRole('button', { name: 'Sort' });
  await fireEvent.click(sortBtn);

  expect(
    await screen.findByRole('menuitem', { name: 'Amount (Low to High)' })
  ).toBeInTheDocument();
  expect(
    await screen.findByRole('menuitem', { name: 'Amount (High to Low)' })
  ).toBeInTheDocument();
  expect(
    await screen.findByRole('menuitem', {
      name: 'Deadline (Earliest to Latest)',
    })
  ).toBeInTheDocument();
  expect(
    await screen.findByRole('menuitem', {
      name: 'Deadline (Latest to Earliest)',
    })
  ).toBeInTheDocument();
});

test('renders filters with # of filters applied', async () => {
  renderComponent('?grades[]=8,9&minAmount=400&majors[]=test');
  await waitFor(() =>
    expect(screen.getByText('Filters (4)')).toBeInTheDocument()
  );
});

test('translated filters & sort button - Spanish', async () => {
  renderComponent();
  await act(() => i18n.changeLanguage('es').then());

  expect(screen.getByText('Filtros')).toBeInTheDocument();
  expect(screen.getByText('Ordenar')).toBeInTheDocument();
});

/*

test('translated sort options - Spanish', async () => {
  renderComponent();
  const sortBtn = await screen.getByRole('button', { name: 'Ordenar' });
  UserEvent.click(sortBtn);

  expect(
    screen.getByRole('menuitem', { name: 'Cantidad (menor a mayor)' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('menuitem', { name: 'Cantidad (mayor a menor)' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('menuitem', { name: 'Fecha límite (temprano a tarde)' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('menuitem', { name: 'Fecha límite (tarde a temprano)' })
  ).toBeInTheDocument();
});
*/
