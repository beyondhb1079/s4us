import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

function renderWithRouter(route, component) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {component}
    </MemoryRouter>,
  );
}
