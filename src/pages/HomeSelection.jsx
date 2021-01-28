import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { CircularProgress, makeStyles } from '@material-ui/core';
import Home from './Home';
import UserHome from './UserHome';

const useStyles = makeStyles(() => ({
  progress: {
    display: 'block',
    margin: 'auto',
  },
}));

export default function HomeSelection() {
  const classes = useStyles();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error] = useState();

  function updateUserStatus(user) {
    setLoading(false);
    setIsSignedIn(!!user);
  }

  useEffect(
    () => firebase.auth().onAuthStateChanged((user) => updateUserStatus(user)),
    []
  );

  return (
    <>
      {error?.toString() ||
        (loading && <CircularProgress className={classes.progress} />) ||
        (isSignedIn ? <UserHome /> : <Home />)}
    </>
  );
}
