import { vi } from 'vitest';
import { FormikProps, FormikValues } from 'formik';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeadlineField from './DeadlineField';

test('renders date picker field', () => {
  const formik = {
    values: {
      deadline: new Date('12/25/2004'),
    },
    errors: {},
    setFieldValue: vi.fn(),
  } as unknown as FormikProps<FormikValues>;

  render(<DeadlineField label="Deadline *" formik={formik} />);
  const deadlineField = screen.getByRole('group', { name: /deadline/i });
  expect(deadlineField).toBeInTheDocument();
  expect(deadlineField).toHaveTextContent('12/25/2004');
});

test.skip('date change', () => {
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

  const deadlineField = utils.getByRole('group', { name: /deadline/i });
  fireEvent.change(deadlineField, { target: { value: '01/01/2021' } });
  expect(date).toEqual(new Date('01/01/2021'));
});
