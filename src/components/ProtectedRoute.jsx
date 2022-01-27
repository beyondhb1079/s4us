import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import { Container, Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';

function ProtectedRoute({ element }) {
  const location = useLocation();
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

  const { t } = useTranslation();

  if (isSignedIn === undefined) {
    return (
      <CircularProgress
        sx={{
          display: 'flex',
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    );
  }
  if (isSignedIn === true) {
    return element;
  }
  return (
    <Container sx={{ p: 2 }}>
      <Typography variant="h5">{t('protectedPage')}</Typography>
      {showLoginDialog === undefined && (
        <Navigate to="" replace state={{ showLoginDialog: true }} />
      )}
    </Container>
  );
}
ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
};
export default ProtectedRoute;
