import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomeSection from './HomeSection';

const renderWithTheme = (ui: JSX.Element) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

describe('HomeSection', () => {
  test('renders the given title', () => {
    renderWithTheme(
      <HomeSection title="Topology" description="Math course" pic="manifold" />
    );
    expect(screen.getByText('Topology')).toBeInTheDocument();
  });

  test('renders given description', () => {
    renderWithTheme(
      <HomeSection title="Topology" description="Math course" pic="manifold" />
    );
    expect(screen.getByText('Math course')).toBeInTheDocument();
  });

  test('renders no buttons by default', () => {
    renderWithTheme(
      <HomeSection title="Topology" description="Math course" pic="manifold" />
    );
    const item = screen.queryByRole('button');
    expect(item).toBe(null);
  });

  test('renders given buttons', async () => {
    renderWithTheme(
      <HomeSection
        title="Topology"
        description="Math course"
        buttons={[<Button>Hello</Button>, <Button>Hello</Button>]}
        pic="manifold"
      />
    );
    const items = screen.queryAllByRole('button');
    expect(items).toHaveLength(2);
  });
});
