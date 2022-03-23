import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useAuth from '../lib/useAuth';

function ProtectedRoute({ element }) {
  const location = useLocation();
  const { showLoginDialog } = location.state || {
    showLoginDialog: undefined,
  };
  const { currentUser } = useAuth();

  const { t } = useTranslation();

  if (currentUser === undefined) {
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
  return currentUser ? (
    element
  ) : (
    <Container sx={{ p: 2 }}>
      <Typography variant="h5">{t('protectedPage')}</Typography>
      {showLoginDialog === undefined && (
        <Navigate
          to={location.pathname}
          replace
          state={{ showLoginDialog: true }}
        />
      )}
    </Container>
  );
}
ProtectedRoute.propTypes = {
  element: PropTypes.node.isRequired,
};
export default ProtectedRoute;
