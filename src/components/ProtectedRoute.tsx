import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useAuth from '../lib/useAuth';

function ProtectedRoute({ element }: { element: JSX.Element }): JSX.Element {
  const location = useLocation();
  const showLoginDialog = (location.state as { showLoginDialog?: boolean })
    ?.showLoginDialog;
  const { currentUser } = useAuth();

  const { t } = useTranslation('common');

  if (currentUser === undefined) {
    return (
      <Box
        sx={{
          display: 'flex',
          minHeight: '50vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CircularProgress />
      </Box>
    );
  }

  if (currentUser) {
    return element;
  }

  return (
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
