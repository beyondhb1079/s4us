import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import scholarships from '../testdata/scholarships';

function ScholarshipDetailsPage() {
  const { id } = useParams();
  // will get replaced once we make actual api calls
  const scholarship = scholarships.filter((item) => item.id === id)[0];
  if (!scholarship) {
    return (<h1>Scholarship Not Found</h1>);
  }

  const {
    name, amount, deadline, website, school, year, description,
  } = scholarship;

  return (
    <Container>
      <h1>{name}</h1>
      <h2>{amount}</h2>
      <h3>{deadline}</h3>
      <h3>{website}</h3>
      <h3>{school}</h3>
      <h3>{year}</h3>
      <p>{description}</p>
    </Container>
  );
}

export default ScholarshipDetailsPage;
