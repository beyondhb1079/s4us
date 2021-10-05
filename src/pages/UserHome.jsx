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
import makeStyles from '@mui/styles/makeStyles';
import Scholarships from '../models/Scholarships';
import ScholarshipList from '../components/ScholarshipList';

const useStyles = makeStyles((theme) => ({
  browseGrid: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  browseButton: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
  scholarshipsAddedBar: {
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
  noneAddedGrid: {
    alignItems: 'center',
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      padding: theme.spacing(2),
      textAlign: 'center',
    },
  },
  inboxIcon: {
    fontSize: theme.spacing(25),
  },
  progress: {
    display: 'block',
  },
  loadMoreButton: {
    margin: theme.spacing(3, 0),
  },
}));

export default function UserHome() {
  const classes = useStyles();
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
        className={classes.browseGrid}
      >
        <Grid item sm={6} xs={12}>
          <Typography variant="h5" gutterBottom>
            Looking for scholarships?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/scholarships"
            className={classes.browseButton}
          >
            Browse Scholarships
          </Button>
        </Grid>
        <Grid item sm={6} xs={12}>
          {/* TODO: Image here with certain height */}
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.scholarshipsAddedBar}>
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
            to="/scholarships/new"
          >
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
            className={classes.noneAddedGrid}
          >
            <Grid item>
              <InboxIcon className={classes.inboxIcon} />
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
