import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import ScholarshipsMadeSimple from '../components/ScholarshipsMadeSimple';
import HomeSection from '../components/HomeSection';
import graduation from '../img/img2.svg';

function PublicHome() {
  return (
    <>
      <HomeSection
        alignItems="center"
        direction="row"
        title="Scholarships for everyone."
        description="Find your dream scholarship together."
        buttons={[
          <Button
            component={Link}
            to="/scholarships"
            variant="contained"
            color="primary">
            Find Scholarships
          </Button>,
          <Button
            component={Link}
            to="/scholarships/new"
            variant="outlined"
            color="primary">
            Add a Scholarship
          </Button>,
        ]}
        pic={graduation}
      />
      <ScholarshipsMadeSimple />
    </>
  );
}

export default PublicHome;
