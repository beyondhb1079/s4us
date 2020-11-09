import React from 'react';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import ProfileStepper from '../components/ProfileStepper';

function GetStarted() {
  return (
    <Container>
      <Typography variant="h4" component="h4">
        How will you be using the site?
      </Typography>
      <ProfileStepper />
    </Container>
  );
}
export default GetStarted;
