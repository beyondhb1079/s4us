import React, { useState, useEffect } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import {
  Container,
  Typography,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  progress: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function ProtectedRoute({ component: Component, path }) {
  const location = useLocation();
  const classes = useStyles();
  const { showLoginDialog } = location.state || {
    showLoginDialog: undefined,
  };
  const [isSignedIn, setIsSignedIn] = useState(
    !!firebase.auth().currentUser || undefined
  );

  useEffect(
    () => firebase.auth().onAuthStateChanged((user) => setIsSignedIn(!!user)),
    []
  );

  return (
    <Route
      path={path}
      render={() => {
        if (isSignedIn === undefined) {
          return (
            <Container className={classes.progress}>
              <CircularProgress />
            </Container>
          );
        }
        if (isSignedIn === true) {
          return <Component />;
        }
        return (
          <Container>
            <Typography variant="h5">
              You must log in first to access this page
            </Typography>
            {showLoginDialog === undefined && (
              <Redirect
                push={false}
                to={{
                  state: {
                    showLoginDialog: true,
                  },
                  pathname: location.pathname,
                }}
              />
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
