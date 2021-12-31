import React from 'react';
import img5 from '../img/img5.svg';
import { Link } from 'react-router-dom';
import { Grid, Paper, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

function LookingForScholarshipsBanner() {
  const { t } = useTranslation();

  return (
    <Grid
      container
      component={Paper}
      variant="outlined"
      sx={{ padding: { xs: 2, md: 3 } }}>
      <Grid item sm={6} xs={12}>
        <Typography variant="h5" gutterBottom>
          {t('general.lookingForScholarships')}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/scholarships"
          sx={{ marginY: { xs: 1, md: 2 } }}>
          {t('btn.browseScholarships')}
        </Button>
      </Grid>
      <Grid item sm={6} xs={12}>
        <img src={img5} style={{ maxHeight: '200px' }} />
      </Grid>
    </Grid>
  );
}

export default LookingForScholarshipsBanner;
