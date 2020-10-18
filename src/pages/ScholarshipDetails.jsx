import React, { useEffect, useState } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import Container from '@material-ui/core/Container';
import Scholarship from '../models/Scholarship';

export default function ScholarshipDetailsPage({ match }) {
  const { id } = match.params;
  const [scholarship, setScholarship] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => new Scholarship(id).subscribe((s) => {
    setScholarship(s);
    setLoading(false);
  }, (err) => {
    setError(err);
  }), [id]);

  if (error || loading) {
    return (
      <Container>
        <h1>{error?.toString() || 'Loading...' }</h1>
      </Container>
    );
  }

  const {
    name, amount, deadline, website, school, year, description,
  } = scholarship.data;

  return (
    <Container>
      <h1>{name}</h1>
      <h2>{amount}</h2>
      <h3>{deadline.toString()}</h3>
      <h3>{website}</h3>
      <h3>{school}</h3>
      <h3>{year}</h3>
      <p>{description}</p>
    </Container>
  );
}

ScholarshipDetailsPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};
