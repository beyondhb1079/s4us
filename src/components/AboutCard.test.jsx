import { screen, render } from '@testing-library/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AboutCard from './AboutCard';
import testPic from '../logo.svg';

const renderWithTheme = (ui) =>
  render(<ThemeProvider theme={createTheme()}>{ui}</ThemeProvider>);

const team = [
  {
    name: 'Job Hernandez',
    img: testPic,
    description: 'I love math and science and technology.',
  },
];

const name = team[0].name;
const img = team[0].img;
const description = team[0].description;

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
