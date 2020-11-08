import React from 'react';
import { Container } from '@material-ui/core';
import LearnMore from '../components/LearnMore';

function Home() {
  return (
    <Container style={{ textAlign: 'center' }}>
      <h1>Find Scholarships Today</h1>
      <LearnMore />
    </Container>
  );
}

export default Home;
