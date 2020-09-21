import React from 'react';
import Container from '@material-ui/core/Container';
import scholarships from '../testdata/scholarships';
import ScholarshipList from '../components/ScholarshipList';
import FilterBar from '../components/FilterBar';

function Scholarships() {
  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>SCHOLARSHIPS</h1>
      <FilterBar />
      <ScholarshipList scholarships={scholarships} />
    </Container>
  );
}

export default Scholarships;
