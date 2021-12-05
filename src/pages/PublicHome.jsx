import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import ScholarshipsMadeSimple from '../components/ScholarshipsMadeSimple';
import HomeSection from '../components/HomeSection';
import graduation from '../img/img2.svg';
import searching from '../img/img3.svg';

function PublicHome() {
  return (
    <>
      <HomeSection
        direction="row"
        title="Scholarships for everyone."
        main
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
      <Box sx={{ background: (theme) => theme.palette.background.paper }}>
        <HomeSection
          alignItems="center"
          direction="row"
          title="Lets start searching!"
          buttons={[
            <Button
              component={Link}
              to="/scholarships"
              variant="contained"
              color="primary">
              Search Scholarships
            </Button>,
          ]}
          pic={searching}
        />
      </Box>
    </>
  );
}

export default PublicHome;
