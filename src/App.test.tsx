import React, { Suspense } from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

// hacky workaround to allow findBy to work
// TODO: Figure out a cleaner solution..
window.MutationObserver = require('mutation-observer');
window.scrollTo = jest.fn();

afterAll(() => jest.clearAllMocks());

test('renders home page by default', async () => {
  const { findByText, getAllByRole, getByRole } = render(
    <Suspense fallback="">
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Suspense>
  );

  await findByText('Scholarship search made simple');
  expect(getAllByRole('tab')).toHaveLength(4);
  expect(getByRole('tab', { name: /scholarships/i })).toBeInTheDocument();
  expect(getByRole('tab', { name: /add/i })).toBeInTheDocument();
  expect(getByRole('tab', { name: /students/i })).toBeInTheDocument();
  expect(getByRole('tab', { name: /community/i })).toBeInTheDocument();
});

test('can navigate to contact page', async () => {
  const user = userEvent.setup();
  const { findByRole, getAllByRole, getByRole } = render(
    <Suspense fallback="">
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </Suspense>
  );
  const footerLink = await findByRole('link', { name: /contact/i });

  await user.click(contactLink);
});
