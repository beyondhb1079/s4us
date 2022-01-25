import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { CircularProgress } from '@mui/material';
import PublicHome from './PublicHome';
import UserHome from './UserHome';

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(undefined);
  const loading = isSignedIn === undefined;

  useEffect(
    () => firebase.auth().onAuthStateChanged((user) => setIsSignedIn(!!user)),
    []
  );

  if (loading) {
    return <CircularProgress sx={{ display: 'block', margin: 'auto' }} />;
  }

  return isSignedIn ? <UserHome /> : <PublicHome />;
}
