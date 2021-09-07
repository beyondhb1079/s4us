import React from 'react';
import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import ScholarshipAmountField from './ScholarshipAmountField';

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
  renderWithAmountType('FIXED');

  const select = screen.getByRole('button');
  UserEvent.click(select);

  const options = screen.getAllByRole('option');
  expect(options[0]).toHaveTextContent('Fixed');
  expect(options[1]).toHaveTextContent('Varies');
  expect(options[2]).toHaveTextContent('Full Tuition');
});

test('single textfield when Fixed selected', () => {
  renderWithAmountType('FIXED');
  expect(screen.getAllByRole('textbox')).toHaveLength(1);
});

test('two textfields when Varies selected', () => {
  renderWithAmountType('VARIES');
  expect(screen.getAllByRole('textbox')).toHaveLength(2);
});

test('no textfield when Full Tuition selected', () => {
  renderWithAmountType('FULL_TUITION');
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
});
