import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Typography, Box, Collapse } from '@mui/material';
import Scholarships from '../models/Scholarships';
import ScholarshipCard from '../components/ScholarshipCard';
import ShowMoreScholarships from '../components/ShowMoreScholarships';
import { Alert } from '@mui/material';
import bannerImg from '../img/detail-page-banner.jpg';
import { useLocation, useNavigationType, useParams } from 'react-router-dom';
import ScholarshipsContext from '../models/ScholarshipsContext';

export default function ViewScholarship() {
  const location = useLocation();
  const { id } = useParams();
  const { scholarships } = useContext(ScholarshipsContext);
  const [scholarship, setScholarship] = useState(
    scholarships.find((s) => s.id === id) || location?.state?.scholarship
  );
  const [error, setError] = useState();
  const loading = !error && (!scholarship || scholarship.id !== id);
  const prevPath = location?.state?.prevPath;
  const justEdited =
    scholarship &&
    (prevPath === `${location.pathname}/edit` ||
      prevPath === `/scholarships/new`);
  const navType = useNavigationType();
  const [showAlert, setShowAlert] = useState(true);

  // Fetch the scholarship if we need to load it
  useEffect(() => {
    let mounted = true;
    if (loading) {
      Scholarships.id(id)
        .get()
        .then((s) => mounted && setScholarship(s))
        .catch((e) => mounted && setError(e));
    }
    return () => {
      mounted = false;
    };
  }, [id, loading]);

  if (error || loading) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom align="center">
          {error?.toString() || 'Loading...'}
        </Typography>
      </Container>
    );
  }

  const { name, dateAdded, lastModified } = scholarship.data;
  return (
    <Container maxWidth="md">
      <Helmet>
        <title>{name}</title>
      </Helmet>

      {justEdited && navType === 'PUSH' && (
        <Collapse in={showAlert}>
          <Alert
            color="primary"
            variant="filled"
            onClose={() => setShowAlert(false)}>
            {`Scholarship successfully ${
              Date.parse(dateAdded) === Date.parse(lastModified)
                ? 'submitted.'
                : 'updated.'
            }`}
          </Alert>
        </Collapse>
      )}

      <Box
        component="img"
        src={bannerImg}
        sx={{
          width: '100%',
          objectFit: 'cover',
          maxHeight: 250,
          objectPosition: { md: '0px -50px' },
        }}
      />

      <ScholarshipCard scholarship={scholarship} style="detail" />
      <ShowMoreScholarships currentId={scholarship.id} />
    </Container>
  );
}
