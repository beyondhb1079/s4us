import React from 'react';
import { render, screen } from '@testing-library/react';
import Suggest from './Suggest';

// Mock the translations
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, defaultText: string) => defaultText || key,
  }),
}));

describe('Suggest Component', () => {
  it('renders correctly', () => {
    render(<Suggest />);
    expect(screen.getByText('Suggest a Link')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Queue for Analysis/i }),
    ).toBeInTheDocument();
  });
});
