import React from 'react';
import { Container } from '@material-ui/core';
import LearnMore from '../components/LearnMore';

function Home() {
  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>Find Scholarships Today</h1>
      <LearnMore />
    </Container>
  );
}

export default Home;
