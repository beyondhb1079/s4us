import React from 'react';
import { render, screen } from '@testing-library/react';
import ScholarshipDetailCardCell from './ScholarshipDetailCardCell';

test('renders ScholarshipDetailCardCell', () => {
  const mockLabel = 'label';
  const mockText = 'text';

  render(<ScholarshipDetailCardCell label={mockLabel} text={mockText} />);

  expect(screen.getByText(mockLabel)).toBeInTheDocument();
  expect(screen.getByText(mockText)).toBeInTheDocument();
});
