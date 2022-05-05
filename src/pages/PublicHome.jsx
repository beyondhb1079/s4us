import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import ScholarshipsMadeSimple from '../components/ScholarshipsMadeSimple';
import HomeSection from '../components/HomeSection';
import { useTranslation } from 'react-i18next';
import graduation from '../img/img2.svg';
import searching from '../img/img3.svg';

function PublicHome() {
  const { t } = useTranslation('common');

  return (
    <>
      <HomeSection
        direction="row"
        title={t('home.public.landingSection.title')}
        main
        description={t('home.public.landingSection.subTitle')}
        buttons={[
          <Button
            component={Link}
            to="/scholarships"
            variant="contained"
            color="primary">
            {t('btn.browseScholarships')}
          </Button>,
          <Button
            component={Link}
            to="/scholarships/new"
            variant="outlined"
            color="primary">
            {t('btn.addScholarship')}
          </Button>,
        ]}
        pic={graduation}
      />

      <ScholarshipsMadeSimple />

      <Box sx={{ background: (theme) => theme.palette.background.paper }}>
        <HomeSection
          alignItems="center"
          direction="row"
          title={t('home.public.startSearch')}
          buttons={[
            <Button
              component={Link}
              to="/scholarships"
              variant="contained"
              color="primary">
              {t('btn.browseScholarships')}
            </Button>,
          ]}
          pic={searching}
        />
      </Box>
    </>
  );
}

export default PublicHome;
