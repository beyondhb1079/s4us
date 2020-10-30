import React from 'react';
import { Container } from '@material-ui/core';
import ProfileDisplay from '../components/ProfileDisplay';

function Home() {
  return (
    <Container style={{ textAlign: 'center' }}>
      <h1>Find Scholarships Today</h1>
      <ProfileDisplay />
    </Container>
  );
}

export default Home;
