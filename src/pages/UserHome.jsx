import React from 'react';
import Box from '@material-ui/core/Box';
import InboxIcon from '@material-ui/icons/Inbox';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import {
  Link as MuiLink,
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';

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
  addScholarship: {
    marginTop: theme.spacing(6),
  },
  addTextAndLink: {
    textAlign: 'center',
  },
  addIconSpacing: {
    marginTop: theme.spacing(6),
  },
  centerTextAndLink: {
    textAlign: 'center',
  },
  centerIcon: {
    textAlign: 'center',
  },
}));

export default function UserHome() {
  const classes = useStyles();
  const user = firebase.auth().currentUser;

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
      <Box className={classes.centerIcon}>
        <InboxIcon
          style={{ fontSize: 200 }}
          className={classes.addIconSpacing}
        />
      </Box>
      <Box className={classes.centerTextAndLink}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          className={classes.noScholarshipsAdded}>
          No Scholarships Added Yet
        </Typography>

        <Typography variant="h10" component="h2" gutterButton color="primary">
          <MuiLink component={Link} to="/scholarship/new">
            Add a Scholarship
          </MuiLink>
        </Typography>
      </Box>
    </Container>
  );
}
