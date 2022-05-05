import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { initializeTestApp } from '../lib/testing';
import Header from './Header';

initializeTestApp({ apiKey: 'fake-api-key' });

// hacky workaround to allow findBy to work
// TODO: Figure out a cleaner solution.
window.MutationObserver = require('mutation-observer');

function renderAtUrl(url) {
  delete window.location;
  window.location = new URL(url);
  return render(
    <ThemeProvider theme={createTheme()}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </ThemeProvider>
  );
}

test('does not render alert by default', async () => {
  renderAtUrl('https://www.example.com');
  await screen.findByText('btn.login');
  const alertElement = screen.queryByText(/This is a preview/i);
  expect(alertElement).not.toBeInTheDocument();
});

test('renders alert on PR preview URL', async () => {
  renderAtUrl('https://s4us-pr-49.onrender.com/foo');
  await screen.findByText('btn.login');
  const alertElement = screen.getByText(/This is a preview/i);
  expect(alertElement).toBeInTheDocument();
  const linkElement = screen.getByText(/Pull Request #49/i);
  expect(linkElement.href).toEqual(
    'https://github.com/beyondhb1079/s4us/pull/49'
  );
});
