import React, { Suspense } from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';
import { deleteApp, initializeApp } from 'firebase/app';

const app = initializeApp({ apiKey: 'fake-api-key' });
afterAll(() => deleteApp(app));

// hacky workaround to allow findBy to work
// TODO: Figure out a cleaner solution.
window.MutationObserver = require('mutation-observer');

function renderAtUrl(url: string | URL) {
  delete window.location;
  window.location = new URL(url) as unknown as Location;
  return render(
    <Suspense fallback="loading">
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={createTheme()}>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </ThemeProvider>
      </I18nextProvider>
    </Suspense>
  );
}

test('does not render alert by default', async () => {
  renderAtUrl('https://www.example.com');
  await screen.findByText('Login');

  const alertElement = screen.queryByText(/This is a preview/i);
  expect(alertElement).not.toBeInTheDocument();
});

test('renders alert on PR preview URL', async () => {
  renderAtUrl('https://s4us-pr-49.onrender.com/foo');
  await screen.findByText('Login');

  const alertElement = screen.getByText(/This is a preview/i);
  expect(alertElement).toBeInTheDocument();
  const linkElement = screen.getByText(/Pull Request #49/i);
  expect(linkElement.href).toEqual(
    'https://github.com/beyondhb1079/s4us/pull/49'
  );
});
