import React from 'react';
import { render, screen } from '@testing-library/react';
import HomeSection from './HomeSection';
import Button from '@material-ui/core/Button';

describe('HomeSection', () => {
  test('renders the given title', () => {
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

  test('renders given description', () => {
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

  test('renders no buttons by default', () => {
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
    
    test('render given buttons', async () => {
        render(
            <HomeSection
              title="Topology"
              description="Math course"
              buttons={[
                  <Button
                    to="/about"
                    variant="outlined"
                    color="primary">
                    Hello
                  </Button>,
                  <Button
                    to="/about"
                    variant="outlined"
                    color="primary">
                    Hello
                  </Button>,
              ]}
              pic="manifold"/>
        );
        const items = screen.queryAllByRole('button');
        expect(items).toHaveLength(2);
    });
});

