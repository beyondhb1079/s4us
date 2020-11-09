import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import DatePicker from './DatePicker';

test('renders date picker field', () => {
  const { getByLabelText } = render(
    <DatePicker
      id="deadline"
      label="Deadline"
      value={new Date(12, 5, 2)}
      onChange={() => {}}
    />,
    { wrapper: MemoryRouter }
  );

  const deadlineField = getByLabelText('Deadline *');
  expect(deadlineField).toBeInTheDocument();
});

test('date change', () => {
  const { getByLabelText } = render(
    <DatePicker
      id="deadline"
      label="Deadline"
      value={new Date(12, 5, 2)}
      onChange={() => {}}
    />,
    { wrapper: MemoryRouter }
  );

  const deadline = getByLabelText('Deadline *');
  fireEvent.change(deadline, {
    target: { value: new Date('December 17, 2005') },
  });
  expect(deadline.value).toBe('17/20/0500');
});
