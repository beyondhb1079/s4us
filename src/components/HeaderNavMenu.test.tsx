import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderNavMenu from './HeaderNavMenu';
import { BrowserRouter as Router } from 'react-router-dom';

const links = {
  topology: '/topology',
  'abstract-algebra': '/abstract-algebra',
  'differential-geometry': '/differential-geometry',
};

describe('HeaderNavMenu', () => {
  test('renders Header links', () => {
    render(
      <Router>
        <HeaderNavMenu links={links} />
      </Router>,
    );
    expect(
      screen.getByRole('tab', { name: 'topology' }).getAttribute('href'),
    ).toBe('/topology');
    expect(
      screen
        .getByRole('tab', { name: 'abstract-algebra' })
        .getAttribute('href'),
    ).toBe('/abstract-algebra');
    expect(
      screen
        .getByRole('tab', { name: 'differential-geometry' })
        .getAttribute('href'),
    ).toBe('/differential-geometry');
  });
});
