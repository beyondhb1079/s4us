import React, { useState, useEffect } from 'react';
import InboxIcon from '@material-ui/icons/Inbox';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import {
  Link as MuiLink,
  CircularProgress,
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Scholarships from '../models/Scholarships';
import ScholarshipList from '../components/ScholarshipList';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(6),
  },
  bannerRoot: {
    backgroundColor: 'white',
    marginTop: theme.spacing(4),
    minHeight: '225px',
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(4),
  },
  browseButton: {
    marginTop: theme.spacing(3),
  },
  addButton: {
    textAlign: 'right',
  },
  scholarshipsAdded: {
    marginTop: theme.spacing(6),
  },
  noScholarshipsAdded: {
    marginTop: theme.spacing(12),
  },
  inboxIcon: {
    marginTop: theme.spacing(6),
  },
  noScholarshipsBox: {
    textAlign: 'center',
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

  useEffect(() => {
    let mounted = true;
    Scholarships.list({ authorId: user.uid })
      .then((results) => mounted && setScholarships(results))
      .then(() => mounted && setError(null))
      .catch((e) => mounted && setError(e))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [user.uid]);

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom className={classes.rootText}>
        Welcome {user.displayName}
      </Typography>
      <Grid container className={classes.bannerRoot}>
        <Grid item sm={8} xs={12}>
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
        <Grid item sm={4} xs={12}>
          {/* Image here */}
        </Grid>
      </Grid>
      <Grid container className={classes.scholarshipsAdded} spacing={2}>
        <Grid item sm={9}>
          <Typography variant="h5" component="h2" gutterBottom>
            Scholarships Added
          </Typography>
        </Grid>
        <Grid item sm={3} className={classes.addButton}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/scholarships/new">
            Add Scholarship
          </Button>
        </Grid>
      </Grid>
      <Box className={classes.noScholarshipsBox}>
        <InboxIcon style={{ fontSize: 200 }} />
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          className={classes.noScholarshipsAdded}>
          <div>{scholarships.length === 0 && 'No Scholarships added.'}</div>
        </Typography>

        <Typography component="h2" color="primary">
          <MuiLink component={Link} to="/scholarship/new">
            Add a Scholarship
          </MuiLink>
        </Typography>
      </Box>
      {error?.toString() ||
        (loading && <CircularProgress className={classes.progress} />) || (
          <>
            <ScholarshipList scholarships={scholarships} />
            <Button
              className={classes.loadMoreButton}
              color="primary"
              onclick={() => {
                alert('clicked');
              }}>
              Load More
            </Button>
          </>
        )}
    </Container>
  );
}
