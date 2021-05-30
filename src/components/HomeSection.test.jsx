import React from 'react';
import { render, screen } from '@testing-library/react';

import HomeSection from './HomeSection';

describe('HomeSection', () => {
  test('renders HomeSection component', () => {
    render(
      <HomeSection
        title="Topology"
        description="Math course"
        buttons={[]}
        pic="manifold"
      />
    );
  });
});
