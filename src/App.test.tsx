import { vi } from 'vitest';
import MutationObserver from 'mutation-observer';
import React, { Suspense } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

// hacky workaround to allow findBy to work
// TODO: Figure out a cleaner solution..
window.MutationObserver = MutationObserver;
window.scrollTo = vi.fn();

afterAll(() => {
  vi.clearAllMocks();
});

test('renders home page by default', () => {
  render(
    <Suspense fallback="">
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Suspense>,
  );

  const linkElements = screen.findAllByText(/Scholarships/i);
  return expect(linkElements).resolves.not.toHaveLength(0);
});
