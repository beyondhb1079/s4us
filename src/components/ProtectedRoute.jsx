import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location';
import firebase from 'firebase';
import PropTypes from 'prop-types';

function ProtectedRoute({ component: Component, path }) {
  const [isSignedIn, setIsSignedIn] = useState(!!firebase.auth().currentUser);
  const lastLocation = useLastLocation();

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return unregisterAuthObserver;
  }, []);

  /* TODO: keep user on same page when trying to log in 
  find way to redirect user to home when they are signed in and navigate to login via path */
  return (
    <Route
      render={() => {
        return isSignedIn ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: lastLocation?.pathname || '/',
              search: '?login=true',
              state: { from: path },
            }}
          />
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
