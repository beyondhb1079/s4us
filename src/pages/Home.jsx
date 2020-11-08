import React from 'react';
import { Container } from '@material-ui/core';
import ScholarshipsMadeSimpleSection from '../components/ScholarshipsMadeSimpleSection';
import LearnMore from '../components/LearnMore';

function Home() {
  return (
    <Container style={{ textAlign: 'center' }}>
      <h1>Find Scholarships Today</h1>
      <ScholarshipsMadeSimpleSection />
      <LearnMore />
    </Container>
  );
}

export default Home;
