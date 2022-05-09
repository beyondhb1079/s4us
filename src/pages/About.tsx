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
import { useTranslation, Trans } from 'react-i18next';
import backgroundImg from '../img/img6.svg';
import LookingForScholarshipsBanner from '../components/LookingForScholarshipsBanner';

export default function About(): JSX.Element {
  const { t } = useTranslation('about');

  const team = [
    {
      name: 'Josue Rios',
      img: 'https://avatars.githubusercontent.com/u/8023233?v=4',
      description: (
        <Trans ns="about" i18nKey="team.josue">
          start
          <MuiLink href="http://beyondhb1079.org/">Beyond HB 1079</MuiLink> end
        </Trans>
      ),
    },
    {
      name: 'Edwin Lopez',
      img: 'https://avatars.githubusercontent.com/u/40483569?v=4',
      description: t('team.edwin', { brand: BRAND_NAME }),
    },
    {
      name: 'Gonzalo Lara',
      img: 'https://avatars.githubusercontent.com/u/64123425?v=4',
      description: t('team.gonzalo'),
    },
    {
      name: 'Sergio Mejia',
      img: 'https://avatars.githubusercontent.com/u/15769145?v=4',
      description: t('team.sergio'),
    },
    {
      name: 'Job Hernandez',
      img: 'https://avatars.githubusercontent.com/u/69167740?v=4',
      description: t('team.job'),
    },
  ];

  return (
    <Container sx={{ p: 2 }}>
      <Helmet>
        <title>{t('titleTag')}</title>
      </Helmet>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography component="h2" variant="button" gutterBottom>
            {t('meetTheTeam')}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {t('title')}
          </Typography>
          <Typography paragraph>
            {t('description', { brand: BRAND_NAME })}
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
