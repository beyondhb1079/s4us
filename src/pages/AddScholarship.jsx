import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import firebase from 'firebase';
import {
  Alert,
  AlertTitle,
  Container,
  Typography,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import ScholarshipForm from '../components/ScholarshipForm';
import Scholarships from '../models/Scholarships';
import SubmissionAlert from '../components/SubmissionAlert';
import AmountType from '../types/AmountType';
import backgroundImg from '../img/img3.svg';

function AddScholarship() {
  const [submissionAlert, setSubmissionAlert] = useState(null);
  const user = firebase.auth().currentUser;

  const scholarship = Scholarships.new({
    name: '',
    deadline: null,
    description: '',
    amount: {
      type: AmountType.Fixed,
      min: 0,
      max: 0,
    },
    website: '',
    organization: '',
    tags: [],
    author: { id: user?.uid, email: user?.email },
    requirements: {},
  });

  return (
    <Container maxWidth="md">
      <Helmet>
        <title>Add a Scholarship</title>
      </Helmet>

      <Grid
        container
        spacing={2}
        sx={{ textAlign: { xs: 'center', md: 'left' } }}>
        <Grid item sm={12} md={6}>
          <Typography gutterBottom>Submit a Scholarship</Typography>
          <Typography variant="h4" gutterBottom>
            Additional information
          </Typography>
          <Typography>
            Help our team provide the best search results for students and
            community members looking for scholarships by contributing as much
            detailed information possible.
          </Typography>
        </Grid>

        <Grid item sm={12} md={6}>
          <Box
            component="img"
            src={backgroundImg}
            sx={{
              overflow: 'hidden',
              width: { xs: '60%', md: '120%' },
            }}
          />
        </Grid>
      </Grid>

      <Paper
        elevation={2}
        sx={{
          zIndex: 1,
          position: 'relative',
          p: 1,
          bottom: { md: 5 },
        }}>
        <ScholarshipForm
          scholarship={scholarship}
          submitFn={() =>
            setSubmissionAlert(
              <SubmissionAlert
                id={scholarship.id}
                name={scholarship.data.name}
                onClose={() => setSubmissionAlert(null)}
              />
            )
          }
          onSubmitError={(error) =>
            setSubmissionAlert(
              <Alert severity="error" onClose={() => setSubmissionAlert(null)}>
                <AlertTitle>Error</AlertTitle>
                {error.toString()}
              </Alert>
            )
          }
        />
      </Paper>
      {submissionAlert}
    </Container>
  );
}
export default AddScholarship;
