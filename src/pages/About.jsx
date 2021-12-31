import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Container,
  Grid,
  Link as MuiLink,
  Typography,
  Box,
} from '@mui/material';
import AboutCard from '../components/AboutCard';
import { BRAND_NAME } from '../config/constants';
import backgroundImg from '../img/img6.svg';
import LookingForScholarshipsBanner from '../components/LookingForScholarshipsBanner';

const team = [
  {
    name: 'Josue Rios',
    img: 'https://avatars.githubusercontent.com/u/8023233?v=4',
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
    img: 'https://avatars.githubusercontent.com/u/40483569?v=4',
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
    img: 'https://avatars.githubusercontent.com/u/64123425?v=4',
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
    img: 'https://avatars.githubusercontent.com/u/15769145?v=4',
    description: (
      <>
        I’m a UX Designer that is interested in using technology as a means to
        solve problems. My personal experiences have inspired my focus on
        empathy and universal design. I find joy in the ability to explore ideas
        with a central aim to create solutions that will help people solve
        meaningful problems.
      </>
    ),
  },
  {
    name: 'Job Hernandez',
    img: 'https://avatars.githubusercontent.com/u/69167740?v=4',
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
      <Helmet>
        <title>About</title>
      </Helmet>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography component="h2" variant="button" gutterBottom>
            MEET THE TEAM
          </Typography>
          <Typography variant="h4" gutterBottom>
            For and by the undocu community.
          </Typography>
          <Typography paragraph>
            Meet the team behind DreamScholars. We are a group of lifelong
            learners who are passionate about technology and community
            upliftment. The project arose from our own struggles as students and
            the lack of resources for our community.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box sx={{ width: { xs: '60%', md: '90%' }, m: 'auto' }}>
            <img src={backgroundImg} alt="grad picture" />
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={3}
        sx={{ mb: 3 }}>
        {team.map(({ name, img, description }) => (
          <Grid item key={name} xs={12} sm={6} md={4}>
            <AboutCard {...{ name, img, description }} />
          </Grid>
        ))}
      </Grid>

      <LookingForScholarshipsBanner />
    </Container>
  );
}
export default About;
