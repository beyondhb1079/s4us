import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Container, Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useAuth from '../lib/useAuth';

function ProtectedRoute({ element }: { element: JSX.Element }): JSX.Element {
  const location: any = useLocation();
  const showLoginDialog = location.state?.showLoginDialog;
  const { currentUser } = useAuth();

  const { t } = useTranslation('common');

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
export default ProtectedRoute;
