import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import ScholarshipForm from '../components/ScholarshipForm';
import Scholarships from '../models/Scholarships';
import SubmissionAlert from '../components/SubmissionAlert';
import backgroundImg from '../img/img3.svg';
import { useTranslation } from 'react-i18next';

function AddScholarship() {
  const [scholarship, setScholarship] = useState(Scholarships.new());
  const [submissionAlert, setSubmissionAlert] = useState(false);
  const { t } = useTranslation();

  return (
    <Container maxWidth="md">
      <Helmet>
        <title>Add a Scholarship</title>
      </Helmet>

      <Grid container spacing={2}>
        <Grid
          item
          sm={12}
          md={6}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography gutterBottom>{t('addScholarship.sub')}</Typography>
          <Typography variant="h4" gutterBottom>
            {t('addScholarship.title')}
          </Typography>
          <Typography>{t('addScholarship.desc')}</Typography>
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
        <ScholarshipForm
          scholarship={scholarship}
          onSubmit={(s) => {
            setScholarship(Scholarships.new());
            setSubmissionAlert(
              <SubmissionAlert
                id={s.id}
                name={s.data.name}
                onClose={() => setSubmissionAlert(null)}
              />
            );
          }}
        />
        {submissionAlert}
      </Paper>
    </Container>
  );
}
export default AddScholarship;
