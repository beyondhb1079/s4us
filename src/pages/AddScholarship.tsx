import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Typography, Grid, Box } from '@mui/material';
import ScholarshipForm from '../components/ScholarshipForm';
import Scholarships from '../models/Scholarships';
import backgroundImg from '../img/img3.svg';
import { useTranslation } from 'react-i18next';

function AddScholarship(): JSX.Element {
  const { t } = useTranslation('addScholarship');

  return (
    <Box sx={{ p: 2 }}>
      <Helmet>
        <title>{t('title')}</title>
      </Helmet>

      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid
            item
            sm={12}
            md={6}
            sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h4" gutterBottom>
              {t('title')}
            </Typography>
            <Typography paragraph>{t('description')}</Typography>
            <Typography paragraph>{t('description2')}</Typography>
          </Grid>

          <Grid item sm={12} md={6} sx={{ width: '100%' }}>
            <Box
              component="img"
              src={backgroundImg}
              sx={{
                overflow: 'hidden',
                display: 'block',
                m: 'auto',
                width: { xs: '60%', md: '100%' },
              }}
            />
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="xl">
        <ScholarshipForm scholarship={Scholarships.new()} />
      </Container>
    </Box>
  );
}
export default AddScholarship;
