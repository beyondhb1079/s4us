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

test('renders Range field', () => {
  const { getByLabelText } = render(
    <ScholarshipAmountField
      amountType="Fixed"
      minAmount={0}
      maxAmount={0}
      onTypeChange={() => {}}
      updateAmount={() => {}}
    />,
    { wrapper: MemoryRouter }
  );

  const fixedLabel = getByLabelText('Fixed Amount:$');
  expect(fixedLabel).toBeInTheDocument();

  // TODO: find way to test if input field is rendered
  // const amountField = getByLabelText("amount");
  // expect(amountField).toBeInTheDocument();
});
