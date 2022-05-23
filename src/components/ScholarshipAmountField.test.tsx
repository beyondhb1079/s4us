import React, { Suspense } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import ScholarshipAmountField from './ScholarshipAmountField';
import AmountType from '../types/AmountType';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

const formik = {
  values: {
    amount: {},
  },
};

function renderWithAmountType(type: AmountType) {
  formik.values.amount.type = type;
  return render(
    <Suspense fallback="loading">
      <I18nextProvider i18n={i18n}>
        <ScholarshipAmountField formik={formik} />
      </I18nextProvider>
    </Suspense>
  );
}

test('renders select options', async () => {
  renderWithAmountType(AmountType.Fixed);

  const select = await waitFor(() => screen.getByRole('button'));
  await UserEvent.click(select);

  const options = screen.getAllByRole('option');
  expect(options[0]).toHaveTextContent('Fixed');
  expect(options[1]).toHaveTextContent('Varies');
  expect(options[2]).toHaveTextContent('Full Tuition');
});

test('single textfield when Fixed selected', () => {
  renderWithAmountType(AmountType.Fixed);
  expect(screen.getAllByRole('textbox')).toHaveLength(1);
});

test('two textfields when Varies selected', () => {
  renderWithAmountType(AmountType.Varies);
  expect(screen.getAllByRole('textbox')).toHaveLength(2);
});

test('no textfield when Full Tuition selected', () => {
  renderWithAmountType(AmountType.FullTuition);
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
});
