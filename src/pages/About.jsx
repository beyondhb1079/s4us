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
import testPic from '../logo.svg';
import { BRAND_NAME } from '../config/constants';
import { useTranslation, Trans } from 'react-i18next';
import backgroundImg from '../img/img6.svg';
import LookingForScholarshipsBanner from '../components/LookingForScholarshipsBanner';

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

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography component="h2" variant="button" gutterBottom>
            {t('about.meet')}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {t('about.title')}
          </Typography>
          <Typography paragraph>
            {t('about.description', { brand: BRAND_NAME })}
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
