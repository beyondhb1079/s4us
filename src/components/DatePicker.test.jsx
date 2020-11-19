import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import DatePicker from './DatePicker';

test('renders date picker field', () => {
  render(
    <DatePicker
      id="deadline"
      label="Deadline"
      value={new Date(12, 5, 2)}
      onChange={() => {}}
    />,
    { wrapper: MemoryRouter }
  );

  const deadlineField = screen.getByLabelText('Deadline *');
  expect(deadlineField).toBeInTheDocument();
});

test('date change', () => {
  render(
    <DatePicker
      id="deadline"
      label="Deadline"
      value={new Date(12, 5, 2)}
      onChange={() => {}}
    />,
    { wrapper: MemoryRouter }
  );

  const deadline = screen.getByLabelText('Deadline *');
  fireEvent.change(deadline, {
    target: { value: new Date('December 17, 2005') },
  });
  expect(deadline.value).toBe('17/20/0500');
});
