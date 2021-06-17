import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '@material-ui/core/Button';
import HomeSection from './HomeSection';

describe('HomeSection', () => {
  test('renders the given title', () => {
    render(
      <HomeSection title="Topology" description="Math course" pic="manifold" />
    );
    screen.debug();
    expect(screen.getByText('Topology')).toBeInTheDocument();
  });

  test('renders given description', () => {
    render(
      <HomeSection title="Topology" description="Math course" pic="manifold" />
    );
    expect(screen.getByText('Math course')).toBeInTheDocument();
  });

  test('renders no buttons by default', () => {
    render(
      <HomeSection title="Topology" description="Math course" pic="manifold" />
    );
    screen.debug();
    const item = screen.queryByRole('button');
    expect(item).toBe(null);
  });

  test('render given buttons', async () => {
    render(
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
