import React from 'react';
import { Container } from '@material-ui/core';
import ScholarshipsMadeSimpleSection from '../components/ScholarshipsMadeSimpleSection';

function Home() {
  return (
    <Container style={{ textAlign: 'left' }}>
      <h1 style={{ textAlign: 'center' }}>Find Scholarships Today</h1>
      <ScholarshipsMadeSimpleSection />
    </Container>
  );
}

export default Home;
