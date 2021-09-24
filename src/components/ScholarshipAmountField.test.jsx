import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import ScholarshipAmountField from './ScholarshipAmountField';
import AmountType from '../types/AmountType';

const formik = {
  values: {
    amount: {},
  },
};

function renderWithAmountType(type) {
  formik.values.amount.type = type;
  return render(<ScholarshipAmountField formik={formik} />);
}

test('renders select options', () => {
  renderWithAmountType(AmountType.Fixed);

  const select = screen.getByRole('button');
  UserEvent.click(select);

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
