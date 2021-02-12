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
      <h1 style={{ textAlign: 'center' }}>About {BRAND_NAME}</h1>
      <h2>Scholarship Search With {BRAND_NAME}</h2>
      <p>
        Est elit eu mollit reprehenderit enim nisi ea velit mollit dolore.
        Tempor exercitation ullamco tempor occaecat ad ex velit labore excepteur
        eiusmod minim. Enim id aliqua irure veniam est irure culpa ea deseru.
        Ullamco laboris ea ut cupidatat non velit mollit ea ullamco eiu. Enim
        amet officia fugiat dolore ullamco consequat laboris culpa.
      </p>
      <h2>Our History</h2>
      <p>
        Et dolor ex pariatur ex voluptate commodo voluptate culpa commodo
        pariatur magna occaecat. Mollit fugiat ad exercitation enim. Eu pariatur
        id ut mollit do sunt proident consequat exercitation est. Voluptate
        cillum tempor elit proident. Esse culpa eiusmod irure aute qui nulla.
        Reprehenderit enim aute commodo cupidatat ut ipsum ea minim magna velit.
      </p>
      <h2>How {BRAND_NAME} Works</h2>
      <p>
        Laboris amet nostrud amet anim fugiat deserunt ad laboris dolore sint
        eiusmod. In cupidatat amet eu excepteur reprehenderit quis enim id velit
        labore duis culpa. Ex culpa occaecat velit consequat eu. Labore eiusmod
        pariatur occaecat aliqua reprehenderit laboris. Officia qui ad do magna
        excepteur proident laborum ea laborum consectetur aliqua pariatur.
      </p>
      <h2>Meet the Team</h2>
      <Grid container justify="flex-start" alignItems="stretch" spacing={3}>
        {team.map(({ name, img, description }) => (
          <Grid item key={name} xs={12} sm={6} md={4}>
            <AboutCard {...{ name, img, description }} />
          </Grid>
        ))}
      </Grid>
      <h2>Apply for Scholarships today</h2>
      <p>
        Laborum aliqua labore nulla non consequat mollit nostrud quis commodo
        tempor labore irure.
      </p>
      <Button
        component={Link}
        to="/scholarships"
        variant="contained"
        color="primary">
        Start Your Search
      </Button>
    </Container>
  );
}
export default About;
