import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import ScholarshipAmountField from './ScholarshipAmountField';
import AmountType from '../types/AmountType';

function renderWithAmountType(type) {
  return render(
    <ScholarshipAmountField
      onTypeChange={() => {}}
      updateAmount={() => {}}
      amountType={type}
    />
  );
}

test('renders select options', () => {
  renderWithAmountType(AmountType.Fixed);

  const select = screen.getByRole('button');
  UserEvent.click(select);

  const options = screen.getAllByRole('option');
  expect(options[1]).toHaveTextContent('Fixed');
  expect(options[2]).toHaveTextContent('Range');
  expect(options[3]).toHaveTextContent('Full Tuition');
});

test('single textfield when Fixed selected', () => {
  renderWithAmountType(AmountType.Fixed);
  expect(screen.getAllByRole('textbox')).toHaveLength(1);
});

test('two textfields when Range selected', () => {
  renderWithAmountType(AmountType.Range);
  expect(screen.getAllByRole('textbox')).toHaveLength(2);
});

test('no textfield when Full Tuition selected', () => {
  renderWithAmountType(AmountType.FullTuition);
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
});
