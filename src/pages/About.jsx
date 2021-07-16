import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import AboutCard from '../components/AboutCard';
import testPic from '../logo.svg';
import { BRAND_NAME } from '../config/constants';

const team = [
  {
    name: 'Josue Rios',
    img: testPic,
    description: (
      <>
        I am a DACA recipient currently working as a software engineer. I came
        up with this project idea after participating in the{' '}
        <MuiLink href="http://beyondhb1079.org/">Beyond HB 1079</MuiLink> team
        and noticing how painful it is to find scholarships and compile a list
        for undocumented students. My hope is to make this the go-to resource
        for scholarships for undocumented students.
      </>
    ),
  },
  {
    name: 'Edwin Lopez',
    img: testPic,
    description: (
      <>
        I am a software engineer from the University of California Irvine. I
        enjoy learning and using my skills to make software that makes an impact
        in communites. Being a DACA recipient has led me to have an emotional
        connection with {BRAND_NAME}.
      </>
    ),
  },
  {
    name: 'Gonzalo Lara',
    img: testPic,
    description: (
      <>
        My passion for computers has lead me to pursue a career in Software
        Engineering. I am currently a UWB CSS student completing my final year
        in the Computer Science and Software Engineering program. I am 24 years
        old, bilingual and currently a part of the DACA program. I intend to
        contribute as much as possible to building a better tomorrow.
      </>
    ),
  },
  {
    name: 'Sergio Mejia',
    img: testPic,
    description: <>Todo: about Sergio Mejia</>,
  },
  {
    name: 'Alejandro Loaiza',
    img: testPic,
    description: <>Todo: about Alejandro Loaiza</>,
  },
  {
    name: 'Job Hernandez',
    img: testPic,
    description: (
      <>
        I am driven to solve problems with software; software has tremendous
        power to advance society. So, I would like to contribute and have an
        impact.
      </>
    ),
  },
];
function About() {
  return (
    <Container>
      <h3>Meet the Team</h3>
      <h1>For and by the undocu community.</h1>
      <p>
        Meet the team behind DreamScholars. We are a group of life long learners
        who are passionate about technology and community upliftment. The
        project arose from our own struggles as students and lack of resources
        for our community.
      </p>
      <Grid container justify="flex-start" alignItems="stretch" spacing={3}>
        {team.map(({ name, img, description }) => (
          <Grid item key={name} xs={12} sm={6} md={4}>
            <AboutCard {...{ name, img, description }} />
          </Grid>
        ))}
      </Grid>
      <h2>Looking for Scholarships?</h2>
      <Button
        component={Link}
        to="/scholarships"
        variant="contained"
        color="primary">
        Browse Scholarships
      </Button>
    </Container>
  );
}
export default About;
