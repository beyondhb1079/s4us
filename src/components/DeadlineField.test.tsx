import { FormikConfig, FormikValues } from 'formik';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeadlineField from './DeadlineField';

test('renders date picker field', () => {
  const formik: Partial<FormikConfig<FormikValues>> = {
    values: {},
    errors: {},
  };
  formik.values.deadline = new Date('12/25/2004');
  render(<DeadlineField label="Deadline *" formik={formik} />);

  const deadlineField = screen.getByRole('textbox');
  expect(deadlineField).toBeInTheDocument();
  expect(deadlineField).toHaveAttribute('value', '12/25/2004');
});

test('date change', () => {
  let date: Date | null = new Date('12/25/2004');
  const utils = render(
    <DeadlineField
      id="deadline"
      label="Deadline *"
      value={date}
      onChange={(value) => {
        date = value;
      }}
    />,
  );

  const deadlineField = utils.getByRole('textbox');
  fireEvent.change(deadlineField, { target: { value: '01/01/2021' } });
  expect(date).toEqual(new Date('01/01/2021'));
});
