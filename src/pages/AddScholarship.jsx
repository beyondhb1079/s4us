import React from 'react';
import { Helmet } from 'react-helmet';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import ScholarshipForm from '../components/ScholarshipForm';
import Scholarships from '../models/Scholarships';
import backgroundImg from '../img/img3.svg';
import { useTranslation } from 'react-i18next';

function AddScholarship() {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      <Helmet>
        <title>{t('addScholarship.titleTag')}</title>
      </Helmet>

      <Grid container spacing={2}>
        <Grid
          item
          sm={12}
          md={6}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography gutterBottom>
            {t('addScholarship.submitAScholarship')}
          </Typography>
          <Typography variant="h4" gutterBottom>
            {t('addScholarship.additionalInfo')}
          </Typography>
          <Typography>{t('addScholarship.description')}</Typography>
        </Grid>

        <Grid item sm={12} md={6} sx={{ width: '100%' }}>
          <Box
            component="img"
            src={backgroundImg}
            sx={{
              overflow: 'hidden',
              display: 'block',
              m: 'auto',
              width: { xs: '60%', md: '120%' },
            }}
          />
        </Grid>
      </Grid>

      <Paper
        elevation={2}
        sx={{
          zIndex: 1,
          position: 'relative',
          p: { xs: 2, sm: 3 },
          bottom: { md: 40 },
        }}>
        <ScholarshipForm scholarship={Scholarships.new()} />
      </Paper>
    </Container>
  );
}
export default AddScholarship;
