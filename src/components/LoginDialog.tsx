import React, { lazy } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import {
  GoogleAuthProvider,
  EmailAuthProvider,
  FacebookAuthProvider,
  getAuth,
} from 'firebase/auth';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next';
import { getAnalytics, logEvent } from 'firebase/analytics';

const StyledFirebaseAuth = lazy(
  () => import('react-firebaseui/StyledFirebaseAuth')
);

export default function LoginDialog(): JSX.Element {
  const location = useLocation();
  const showLoginDialog = (location.state as any)?.showLoginDialog || false;
  const { t } = useTranslation(['loginDialog', 'common']);

  const navigate = useNavigate();
  const closeDialog = () =>
    navigate(location.pathname, {
      replace: true,
      state: { showLoginDialog: false },
    });

  const uiConfig: firebaseui.auth.Config = {
    signInFlow: 'popup',
    signInOptions: [
      GoogleAuthProvider.PROVIDER_ID,
      EmailAuthProvider.PROVIDER_ID,
      FacebookAuthProvider.PROVIDER_ID,
    ],
    credentialHelper: 'none', // hacky way to disable redirect on email login
    callbacks: {
      signInSuccessWithAuthResult: (authResult) => {
        const { isNewUser, providerId: method } = authResult.additionalUserInfo;
        if (isNewUser) {
          logEvent(getAnalytics(), 'signup', { method });
        } else {
          logEvent(getAnalytics(), 'login', { method });
        }
        closeDialog();
        return false;
      },
    },
  };

  return (
    <Dialog
      open={showLoginDialog}
      onClose={closeDialog}
      aria-labelledby="responsive-dialog-title">
      <DialogContent sx={{ p: 0 }}>
        <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
          <IconButton
            size="medium"
            aria-haspopup="true"
            onClick={() => closeDialog()}
            color="inherit">
            <CancelIcon
              sx={{ color: { xs: 'background.paper', sm: 'inherit' } }}
            />
          </IconButton>
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid
            item
            xs={12}
            sm={6}
            sx={{ color: 'background.paper', bgcolor: 'primary.main' }}>
            <DialogTitle id="responsive-dialog-brand">
              DreamScholars
            </DialogTitle>

            <DialogTitle id="responsive-dialog-welcome">
              <Typography variant="h4" sx={{ color: 'background.paper' }}>
                {t('common:welcome')}
              </Typography>
            </DialogTitle>

            <DialogContentText sx={{ color: 'background.paper', p: 3 }}>
              <Typography paragraph sx={{ color: 'background.paper' }}>
                {t('providesScholarships')}
              </Typography>
              <Typography paragraph sx={{ color: 'background.paper' }}>
                {t('joinCommunity')}
              </Typography>
              <Typography paragraph sx={{ color: 'background.paper' }}>
                {t('getAccess')}
              </Typography>
            </DialogContentText>
          </Grid>

          <Grid item xs={12} sm={6}>
            <DialogTitle
              id="responsive-dialog-title"
              sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 'bold' }}>
                {t('common:actions.signIn')}
              </Typography>
            </DialogTitle>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={getAuth()} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
