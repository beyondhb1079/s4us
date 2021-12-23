import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import AboutCard from '../components/AboutCard';
import testPic from '../logo.svg';
import { BRAND_NAME } from '../config/constants';
import { useTranslation, Trans } from 'react-i18next';

function About() {
  const { t } = useTranslation();

  const team = [
    {
      name: 'Josue Rios',
      img: testPic,
      description: (
        <Trans i18nKey="about.team.josue">
          start
          <MuiLink href="http://beyondhb1079.org/">Beyond HB 1079</MuiLink> end
        </Trans>
      ),
    },
    {
      name: 'Edwin Lopez',
      img: testPic,
      description: t('about.team.edwin', { brand: BRAND_NAME }),
    },
    {
      name: 'Gonzalo Lara',
      img: testPic,
      description: t('about.team.gonzalo'),
    },
    {
      name: 'Sergio Mejia',
      img: testPic,
      description: t('about.team.sergio'),
    },
    {
      name: 'Job Hernandez',
      img: testPic,
      description: t('about.team.job'),
    },
  ];

  return (
    <Container>
      <Helmet>
        <title>About</title>
      </Helmet>
      <Typography component="h2" variant="button" gutterBottom>
        {t('about.meet')}
      </Typography>
      <Typography variant="h4" gutterBottom>
        {t('about.title')}
      </Typography>
      <Typography paragraph>
        DreamScholars aims to make it easier for undocumented students to pay
        for school. Our mission is to remove the financial barriers that prevent
        and discourage undocumented students from pursuing higher education due
        to the difficulties of finding scholarships they qualify for.
      </Typography>
      <Typography paragraph>
        {t('about.description', { brand: BRAND_NAME })}
      </Typography>
      <Typography paragraph>
        Want to get involved? Shoot us an email!
      </Typography>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={3}>
        {team.map(({ name, img, description }) => (
          <Grid item key={name} xs={12} sm={6} md={4}>
            <AboutCard {...{ name, img, description }} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom>
        {t('looking')}
      </Typography>
      <Button
        component={Link}
        to="/scholarships"
        variant="contained"
        color="primary">
        {t('btn.browse')}
      </Button>
    </Container>
  );
}
export default About;
