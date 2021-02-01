import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { CircularProgress, makeStyles } from '@material-ui/core';
import PublicHome from './PublicHome';
import UserHome from './UserHome';

const useStyles = makeStyles(() => ({
  progress: {
    display: 'block',
    margin: 'auto',
  },
}));

export default function Home() {
  const classes = useStyles();
  const [isSignedIn, setIsSignedIn] = useState(undefined);
  const loading = isSignedIn === undefined;

  useEffect(
    () => firebase.auth().onAuthStateChanged((user) => setIsSignedIn(!!user)),
    []
  );

  if (loading) {
    return <CircularProgress className={classes.progress} />;
  }

  return isSignedIn ? <UserHome /> : <PublicHome />;
}
