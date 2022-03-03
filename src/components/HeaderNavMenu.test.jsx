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
  test('renders App component', () => {
    render(
      <Router>
        <HeaderNavMenu links={links} />
      </Router>
    );
  });
  test('renders Header links', () => {
    render(
      <Router>
        <HeaderNavMenu links={links} />
      </Router>
    );
    expect(screen.getByText('topology').closest('a')).toHaveAttribute(
      'href',
      '/topology'
    );
    expect(screen.getByText('abstract-algebra').closest('a')).toHaveAttribute(
      'href',
      '/abstract-algebra'
    );

    expect(
      screen.getByText('differential-geometry').closest('a')
    ).toHaveAttribute('href', '/differential-geometry');
  });
});
