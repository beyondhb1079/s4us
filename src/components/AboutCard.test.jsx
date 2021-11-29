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
    description: <>I love math and science and technology.</>,
  },
];

const name = team[0].name;
const img = team[0].img;
const description = team[0].description;

describe('AboutCard', () => {
  test('renders the given name', () => {
    renderWithTheme(<AboutCard {...{ name, img, description }} />);
    screen.debug();
    expect(screen.getByText('Job Hernandez')).toBeInTheDocument();
  });

  test('renders the description', () => {
    const { container } = renderWithTheme(
      <AboutCard {...{ name, img, description }} />
    );
    container.querySelector(
      'MuiTypography-root MuiTypography-body2 css-e784if-MuiTypography-root'
    );
    expect(container.firstChild).toBeInTheDocument();
    screen.debug();
  });

  test('renders the image', () => {
    renderWithTheme(<AboutCard {...{ name, img, description }} />);
    const imageTitle = screen.getByTitle('picture of Job Hernandez');
    expect(imageTitle).toBeInTheDocument();
  });
});
