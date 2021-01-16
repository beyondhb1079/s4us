import React, { useState, useEffect } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { Container, Typography, CircularProgress } from '@material-ui/core';

function ProtectedRoute({ component: Component, path }) {
  const location = useLocation();
  const { showLoginDialog } = location.state || { showLoginDialog: false };
  const [isSignedIn, setIsSignedIn] = useState(
    !!firebase.auth().currentUser || undefined
  );
  console.log(isSignedIn);
  useEffect(
    () => firebase.auth().onAuthStateChanged((user) => setIsSignedIn(!!user)),
    []
  );

  /* TODO: keep user on same page when trying to log in 
  find way to redirect user to home when they are signed in and navigate to login via path */
  return (
    <Route
      path={path}
      render={() => {
        if (isSignedIn === undefined) {
          return <CircularProgress />;
        }
        if (isSignedIn === true) {
          return <Component />;
        }
        return (
          <Container>
            <Typography variant="h3">
              You must log in first to access this page
            </Typography>
            {showLoginDialog || (
              <Redirect replace to={{ state: { showLoginDialog: true } }} />
            )}
          </Container>
        );
      }}
    />
  );
}
ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.string.isRequired,
};
export default ProtectedRoute;
