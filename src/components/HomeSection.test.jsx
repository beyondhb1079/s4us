import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeSection from './HomeSection';

describe('HomeSection', () => {
  test('checks if the title is in the document', () => {
    render(
      <HomeSection
        title="Topology"
        description="Math course"
        buttons={[]}
        pic="manifold"
      />
    );
    screen.debug();
    expect(screen.getByText('Topology')).toBeInTheDocument();
  });

  test('checks if the description is in the document', () => {
    render(
      <HomeSection
        title="Topology"
        description="Math course"
        buttons={[]}
        pic="manifold"
      />
    );
    expect(screen.getByText('Math course')).toBeInTheDocument();
  });

  test('checks if it renders the given number of buttons', () => {
    render(
      <HomeSection
        title="Topology"
        description="Math course"
        buttons={[]}
        pic="manifold"
      />
    );
    screen.debug();
    const items = screen.queryByRole('button');
    expect(items).toBe(null);
  });
});
