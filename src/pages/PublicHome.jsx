import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import ScholarshipsMadeSimple from '../components/ScholarshipsMadeSimple';
import HomeSection from '../components/HomeSection';
import community from '../img/community.png';
import { useTranslation } from 'react-i18next';

function PublicHome() {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>
        Find Scholarships Today
      </Typography>
      <ScholarshipsMadeSimple />
      <HomeSection
        alignItems="center"
        direction="row-reverse"
        title={t('home.public.startSearch')}
        buttons={[
          <Button
            component={Link}
            to="/about"
            variant="outlined"
            color="primary">
            {t('btn.browse')}
          </Button>,
        ]}
        pic={community}
      />
    </>
  );
}

export default PublicHome;
