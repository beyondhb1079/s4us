import React, { Suspense } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FilterPanel from './FilterPanel';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { act } from 'react-dom/test-utils';

function renderComponent() {
  return render(
    <Suspense fallback="loading">
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <FilterPanel onClose={() => {}} />
        </BrowserRouter>
      </I18nextProvider>
    </Suspense>
  );
}

test('renders component', async () => {
  renderComponent();
  await screen.findByText('Filters');

  [
    'What are you studying?',
    'Min Amount',
    'Grade Level',
    'State',
    'School',
  ].forEach((s) => expect(screen.getByText(s)).toBeInTheDocument());

  expect(
    screen.getByText('Your filters are currently applied.')
  ).toBeInTheDocument();
  expect(
    screen.queryByText('Your changes are not yet applied.')
  ).not.toBeInTheDocument();
  expect(screen.getByText('Apply')).toBeInTheDocument();
  expect(screen.getByText('Cancel')).toBeInTheDocument();
});

test('message change when filter option chosen', async () => {
  renderComponent();
  // Selects Art History from the majors input area
  const majorInput = screen.getByRole('combobox');
  fireEvent.click(majorInput);
  fireEvent.change(majorInput, { target: { value: 'Art' } });
  const artHistory = screen.getByRole('option', { name: 'Art History' });
  fireEvent.click(artHistory);

  expect(screen.findByText('Your changes are not yet applied.'));
  expect(
    screen.queryByText('Your filters are currently applied.')
  ).not.toBeInTheDocument();
});

test('translated component - Spanish', async () => {
  renderComponent();
  await act(() => i18n.changeLanguage('es').then());

  expect(await screen.findByText('Filtros')).toBeInTheDocument();
  ['¿Qué estudia?', 'Cantidad mínima', 'Nivel de grado', 'Estado'].forEach(
    (s) => expect(screen.getByText(s)).toBeInTheDocument()
  );

  expect(
    screen.getByText('Sus filtros están actualmente aplicados.')
  ).toBeInTheDocument();
  expect(screen.getByText('Aplicar')).toBeInTheDocument();
  expect(screen.getByText('Cancelar')).toBeInTheDocument();
});
