import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DatePicker from './DatePicker';

const formik = { values: {}, errors: {} };

test('renders date picker field', () => {
  formik.values.deadline = new Date('12/25/2004');
  render(<DatePicker label="Deadline *" formik={formik} />);

  const deadlineField = screen.getByRole('textbox');
  expect(deadlineField).toBeInTheDocument();
  expect(deadlineField.value).toBe('12/25/2004');
});

// TODO: Make this test pass.
test.skip('date change', () => {
  let date = new Date('12/25/2004');
  const utils = render(
    <DatePicker
      id="deadline"
      label="Deadline *"
      value={date}
      onChange={(value) => {
        date = new Date(value);
        console.log(date);
      }}
    />
  );

  const deadlineField = utils.getByRole('textbox');
  fireEvent.change(deadlineField, { target: { value: '01/01/2021' } });
  expect(date).toBe(new Date('01/01/2021'));
});
