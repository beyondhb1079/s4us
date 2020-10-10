import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Scholarship from '../models/Scholarship';

function ScholarshipDetailsPage() {
  const { id } = useParams();
  const scholarship = Scholarship.get(id);
  if (!scholarship) {
    return (<h1>Scholarship Not Found</h1>);
  }

  const {
    name, amount, deadline, website, school, year, description,
  } = scholarship.data;

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
