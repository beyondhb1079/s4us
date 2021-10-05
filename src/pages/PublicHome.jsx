import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import ScholarshipsMadeSimple from '../components/ScholarshipsMadeSimple';
import HomeSection from '../components/HomeSection';
import community from '../img/community.png';

function PublicHome() {
  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>
        Find Scholarships Today
      </Typography>
      <ScholarshipsMadeSimple />
      <HomeSection
        alignItems="center"
        direction="row-reverse"
        title="For and by the Community"
        description="Interested in helping students find scholarships? Join the family of community contributors, help find scholarships that are open to anyone regardless of citizen status."
        buttons={[
          <Button
            component={Link}
            to="/about"
            variant="outlined"
            color="primary"
          >
            Learn More
          </Button>,
        ]}
        pic={community}
      />
    </>
  );
}

export default PublicHome;
