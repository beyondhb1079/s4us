import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import ScholarshipsMadeSimple from '../components/ScholarshipsMadeSimple';
import HomeSection from '../components/HomeSection';
import { useTranslation } from 'react-i18next';
import graduation from '../img/img2.svg';
import searching from '../img/img3.svg';

function PublicHome() {
  const { t } = useTranslation(['publicHome', 'common']);

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

      <Box sx={{ background: (theme) => theme.palette.background.paper }}>
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

export default PublicHome;
