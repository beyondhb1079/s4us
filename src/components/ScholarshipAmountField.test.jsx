import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import ScholarshipAmountField from './ScholarshipAmountField';

test('renders unknown field', () => {
  const { getByLabelText } = render(
    <ScholarshipAmountField
      amountType="Unknown"
      minAmount={0}
      maxAmount={0}
      onTypeChange={() => {}}
      updateAmount={() => {}}
    />,
    { wrapper: MemoryRouter }
  );

  const unknownField = getByLabelText('Unknown');
  expect(unknownField).toBeInTheDocument();
});

test('renders all amount input fields', () => {
  const { getAllByPlaceholderText } = render(
    <ScholarshipAmountField
      amountType="Fixed"
      minAmount={0}
      maxAmount={0}
      onTypeChange={() => {}}
      updateAmount={() => {}}
    />,
    { wrapper: MemoryRouter }
  );

  const amountFields = getAllByPlaceholderText('Unknown');
  expect(amountFields.length).toBe(3);
});
