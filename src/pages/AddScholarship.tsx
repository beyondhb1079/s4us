import React from 'react';
import useDocumentTitle from '../lib/useDocumentTitle';
import { Container, Typography, Grid, Box } from '@mui/material';
import ScholarshipForm from '../components/ScholarshipForm';
import Scholarships from '../models/Scholarships';
import { useTranslation } from 'react-i18next';

function AddScholarship(): JSX.Element {
  const { t } = useTranslation('addScholarship');
  useDocumentTitle(t('titleTag'));

  return (
    <Box sx={{ p: 2 }}>
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid
            item
            sm={12}
            md={6}
            sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography gutterBottom>{t('submitAScholarship')}</Typography>
            <Typography variant="h4" gutterBottom>
              {t('additionalInfo')}
            </Typography>
            <Typography>{t('description')}</Typography>
          </Grid>

          <Grid item sm={12} md={6} sx={{ width: '100%' }}>
            <Box
              component="img"
              src="/searching.svg"
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
