import { screen, render } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AboutCard from './AboutCard';
import testPic from '../logo.svg';

const renderWithTheme = (ui) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

const name = 'Job Hernandez';
const img = testPic;
const description = 'I love math and science and technology.';

describe('AboutCard', () => {
  test('renders props', () => {
    renderWithTheme(<AboutCard {...{ name, img, description }} />);

    expect(screen.getByText(name)).toBeInTheDocument();

    const image = screen.getByRole('image', {
      name: 'picture of Job Hernandez',
    });
    expect(image).toBeInTheDocument();

    expect(screen.getByText(description)).toBeInTheDocument();
  });
});
