import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles, Typography } from '@material-ui/core';
import ScholarshipsMadeSimple from '../components/ScholarshipsMadeSimple';
import HomeSection from '../components/HomeSection';
import pic from '../img/blank.png';

const useStyles = makeStyles(() => ({
  description: {
    textAlign: 'center',
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h2" className={classes.description} gutterBottom>
        Find Scholarships Today
      </Typography>
      <ScholarshipsMadeSimple />
      <HomeSection
        alignItems="center"
        direction="row-reverse"
        title="For and by the Community"
        description="Et has minim eltir intellegat. Mea aeterno elefiend antiopam ad, nam no suscipit quaerendum. At name mininum ponderum. Est audiam animal molestiate te."
        buttons={[
          <Button
            component={Link}
            to="/about"
            variant="outlined"
            color="primary">
            Learn More
          </Button>,
        ]}
        pic={pic}
      />
    </>
  );
}

export default Home;
