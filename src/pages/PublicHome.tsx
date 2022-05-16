import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import ScholarshipsMadeSimple from '../components/ScholarshipsMadeSimple';
import HomeSection from '../components/HomeSection';
import { useTranslation } from 'react-i18next';
import graduation from '../img/img2.svg';
import searching from '../img/img3.svg';
import useAuth from '../lib/useAuth';

export default function Home(): JSX.Element {
  const { t } = useTranslation(['home', 'common']);
  const { currentUser: user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <>
      <HomeSection
        direction="row"
        title={t('landingSection.title')}
        main
        description={t('landingSection.subTitle')}
        buttons={[
          <Button
            component={Link}
            to="/scholarships"
            variant="contained"
            color="primary">
            {t('common:actions.browseScholarships')}
          </Button>,
          <Button
            component={Link}
            to="/scholarships/new"
            variant="outlined"
            color="primary">
            {t('common:actions.addScholarship')}
          </Button>,
        ]}
        pic={graduation}
      />

      <ScholarshipsMadeSimple />

      <Box sx={{ backgroundColor: 'background.paper' }}>
        <HomeSection
          alignItems="center"
          direction="row"
          title={t('startSearch')}
          buttons={[
            <Button
              component={Link}
              to="/scholarships"
              variant="contained"
              color="primary">
              {t('common:actions.browseScholarships')}
            </Button>,
          ]}
          pic={searching}
        />
      </Box>
    </>
  );
}
