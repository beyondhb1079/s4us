import React from 'react';
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
import firebase from 'firebase';
import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import CancelIcon from '@mui/icons-material/Cancel';

export default function LoginDialog() {
  const location = useLocation();
  const showLoginDialog = location.state?.showLoginDialog || false;

  const navigate = useNavigate();
  const closeDialog = () =>
    navigate(location.pathname, {
      replace: true,
      state: { showLoginDialog: false },
    });

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    ],
    credentialHelper: 'none', // hacky way to disable redirect on email login
    callbacks: {
      signInSuccessWithAuthResult: closeDialog,
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
              <Typography sx={{ color: 'background.paper' }}>
                DreamScholars
              </Typography>
            </DialogTitle>

            <DialogTitle id="responsive-dialog-welcome">
              <Typography variant="h4" sx={{ color: 'background.paper' }}>
                Welcome.
              </Typography>
            </DialogTitle>

            <DialogContentText sx={{ color: 'background.paper', p: 3 }}>
              <Typography paragraph sx={{ color: 'background.paper' }}>
                DreamScholars provides scholarships for all students regardless
                of status.
              </Typography>
              <Typography paragraph sx={{ color: 'background.paper' }}>
                Join our community &amp;
              </Typography>
              <Typography paragraph sx={{ color: 'background.paper' }}>
                Get access to scholarship submissions and other cool features
                soon.
              </Typography>
            </DialogContentText>
          </Grid>

          <Grid item xs={12} sm={6}>
            <DialogTitle
              id="responsive-dialog-title"
              sx={{ textAlign: 'center' }}>
              <Typography sx={{ fontWeight: 'bold' }}>Sign In</Typography>
            </DialogTitle>
            <StyleFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
