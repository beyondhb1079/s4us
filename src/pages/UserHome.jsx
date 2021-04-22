import React, { useState, useEffect, useCallback } from 'react';
import { AddCircle as AddIcon, Inbox as InboxIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import {
  CircularProgress,
  Button,
  Container,
  Grid,
  Link as MuiLink,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import Scholarships from '../models/Scholarships';
import ScholarshipList from '../components/ScholarshipList';

const useStyles = makeStyles((theme) => ({
  browseGrid: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  browseButton: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
  scholarshipsAddedBar: {
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
  noneAddedGrid: {
    alignItems: 'center',
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
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
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const user = firebase.auth().currentUser;

  const [loadMoreFn, setLoadMoreFn] = useState(() =>
    Scholarships.list({ authorId: user.uid })
  );
  const [canLoadMore, setCanLoadMore] = useState(false);

  const loadMoreScholarships = useCallback((scholarshipsList) => {
    let mounted = true;
    scholarshipsList
      .then(({ results, next, hasNext }) => {
        if (!mounted) return;
        setScholarships((prev) => [...prev, ...results]);

        setLoadMoreFn(next);
        setCanLoadMore(hasNext);
      })
      .then(() => mounted && setError(null))
      .catch((e) => mounted && setError(e))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(
    () => loadMoreScholarships(Scholarships.list({ authorId: user.uid })),
    [user.uid, loadMoreScholarships]
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome {user.displayName}
      </Typography>
      <Grid
        container
        component={Paper}
        variant="outlined"
        className={classes.browseGrid}>
        <Grid item sm={6} xs={12}>
          <Typography variant="h5" gutterBottom>
            Looking for scholarships?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/scholarships"
            className={classes.browseButton}>
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
            to="/scholarships/new">
            Add Scholarship
          </Button>
        </Grid>
      </Grid>
      {error?.toString() ||
      (loading && <CircularProgress className={classes.progress} />) ||
      scholarships.length === 0 ? (
        <Grid
          container
          component={Paper}
          variant="outlined"
          className={classes.noneAddedGrid}>
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
      ) : (
        <>
          <ScholarshipList scholarships={scholarships} />
          <Button
            className={classes.loadMoreButton}
            color="primary"
            disabled={canLoadMore}
            // eslint-disable-next-line no-alert
            onClick={() => loadMoreScholarships(loadMoreFn)}>
            Load More
          </Button>
        </>
      )}
    </Container>
  );
}
