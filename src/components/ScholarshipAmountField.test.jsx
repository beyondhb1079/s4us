import React from 'react';
import { render, screen } from '@testing-library/react';
import ScholarshipAmountField from './ScholarshipAmountField';

test('renders radio buttons', () => {
  const labels = ['Full Tuition', /Fixed Amount:.*/, /Range:.*/, 'Unknown'];
  render(
    <ScholarshipAmountField onTypeChange={() => {}} updateAmount={() => {}} />
  );

  // Check for all radio buttons
  expect(screen.getAllByRole('radio')).toHaveLength(4);
  labels.forEach((name) =>
    expect(screen.getByRole('radio', { name })).toBeInTheDocument()
  );
});

test('renders all amount input fields', () => {
  render(
    <ScholarshipAmountField onTypeChange={() => {}} updateAmount={() => {}} />
  );

  const amountFields = screen.getAllByRole('spinbutton');
  expect(amountFields).toHaveLength(3);
  amountFields.forEach((input) => expect(input).toBeDisabled());
});
