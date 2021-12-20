import React from 'react';
import Helmet from 'react-helmet';
import { AddCircle as AddIcon, Inbox as InboxIcon } from '@mui/icons-material';
import { Link, useLocation, useHistory } from 'react-router-dom';
import firebase from 'firebase';
import {
  Button,
  Container,
  Grid,
  Link as MuiLink,
  Paper,
  Typography,
  Alert,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Scholarships from '../models/Scholarships';
import ScholarshipList from '../components/ScholarshipList';
import img5 from '../img/img5.svg';

export default function UserHome() {
  const user = firebase.auth().currentUser;
  const location = useLocation();
  const history = useHistory();
  const URL = location?.state?.url;

  const listScholarshipsFn = () => Scholarships.list({ authorId: user.uid });

  return (
    <Container>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      {location?.state?.name && (
        <Alert
          severity={URL ? 'error' : 'success'}
          onClose={() => history.replace('/')}
          action={
            URL && (
              <>
                <Button onClick={() => history.push(URL)}>Try again</Button>
                <IconButton onClick={() => history.replace('/')} size="small">
                  <CloseIcon />
                </IconButton>
              </>
            )
          }>
          {`${URL ? 'There was an error deleting' : 'Successfully deleted'} ${
            location?.state?.name
          }`}
        </Alert>
      )}

      <Typography variant="h4" gutterBottom>
        Welcome {user.displayName}
      </Typography>
      <Grid
        container
        component={Paper}
        variant="outlined"
        sx={{ padding: { xs: 2, md: 3 } }}>
        <Grid item sm={6} xs={12}>
          <Typography variant="h5" gutterBottom>
            Looking for scholarships?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/scholarships"
            sx={{ marginY: { xs: 1, md: 2 } }}>
            Browse Scholarships
          </Button>
        </Grid>
        <Grid item sm={6} xs={12}>
          <img src={img5} style={{ maxHeight: '192px' }} />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        sx={{ marginY: { xs: 1, md: 2 } }}>
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
            alignItems="center"
            justifyContent="space-around"
            sx={{ padding: 3, marginY: 1 }}>
            <Grid item>
              <InboxIcon sx={{ fontSize: (theme) => theme.spacing(25) }} />
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
