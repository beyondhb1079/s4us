import React from 'react';
import Helmet from 'react-helmet';
import { AddCircle as AddIcon, Inbox as InboxIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import {
  Button,
  Container,
  Grid,
  Link as MuiLink,
  Paper,
  Typography,
} from '@mui/material';
import Scholarships from '../models/Scholarships';
import ScholarshipList from '../components/ScholarshipList';
import img5 from '../img/img5.svg';

export default function UserHome() {
  const user = firebase.auth().currentUser;

  const listScholarshipsFn = () => Scholarships.list({ authorId: user.uid });

  return (
    <Container>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Typography variant="h4" gutterBottom>
        Welcome {user.displayName}
      </Typography>
      <Grid
        container
        component={Paper}
        variant="outlined"
        sx={{ p: { xs: 2, md: 3 } }}>
        <Grid item sm={6} xs={12}>
          <Typography variant="h5" gutterBottom>
            Looking for scholarships?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/scholarships"
            sx={{ my: { xs: 1, md: 2 } }}>
            Browse Scholarships
          </Button>
        </Grid>
        <Grid item sm={6} xs={12}>
          <img src={img5} />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        sx={{ my: { xs: 1, md: 2 } }}>
        <Grid item>
          <Typography variant="h5" component="h2">
            Scholarships You Have Added
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            to="/scholarships/new">
            Add Scholarship
          </Button>
        </Grid>
      </Grid>
      <ScholarshipList
        listFn={listScholarshipsFn}
        noResultsNode={
          <Grid
            container
            component={Paper}
            variant="outlined"
            // alignItems="center"
            justifyContent="center"
            spacing={5}
            sx={{ p: { xs: 2, md: 3 } }}>
            <Grid item>
              <InboxIcon sx={{ fontSize: 256 }} />
            </Grid>
            <Grid item>
              <Typography variant="h5" gutterButtom>
                No Scholarships Added Yet
              </Typography>
              <MuiLink component={Link} to="/scholarships/new">
                Add Scholarship
              </MuiLink>
            </Grid>
          </Grid>
        }
      />
    </Container>
  );
}
