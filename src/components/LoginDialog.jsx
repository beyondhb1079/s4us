import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
} from '@mui/material';
import firebase from 'firebase';
import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import CancelIcon from '@mui/icons-material/Cancel';

export default function LoginDialog() {
  const location = useLocation();
  const { showLoginDialog } = location.state || { showLoginDialog: false };

  const navigate = useNavigate();
  const closeDialog = () =>
    navigate('', {
      replace: true,
      state: {},
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
        <Grid container spacing={2}>
          <Grid
            item
            xs={5}
            sm={5}
            sx={{ color: 'background.paper', bgcolor: 'primary.main' }}>
            <DialogTitle
              id="responsive-dialog-brand"
              sx={{
                padding: 3,
                fontSize: '15px',
                paddingBottom: '21px',
                fontFamily: 'PlayfairDisplay',
              }}>
              DreamScholars
            </DialogTitle>
            <DialogTitle
              id="responsive-dialog-welcome"
              sx={{
                padding: 3,
                fontSize: '30px',
                paddingBottom: '15px',
              }}>
              Welcome.
            </DialogTitle>
            <DialogContentText
              sx={{
                color: 'background.paper',
                padding: 3,
                fontSize: '15px',
              }}>
              DreamScholars provides scholarships for all students regardless of
              status.
              <br></br>
              <br></br>
              Join our community &amp;
              <br></br>
              <br></br>Get access to scholarship submissions and other cool
              features soon.
            </DialogContentText>
          </Grid>
          <Grid item xs={7} sm={7}>
            <IconButton
              size="medium"
              aria-haspopup="true"
              onClick={() => closeDialog()}
              color="inherit">
              <CancelIcon />
            </IconButton>

            <DialogTitle
              id="responsive-dialog-title"
              sx={{
                fontWeight: 'bold',
                fontSize: '16px',
                paddingTop: '45px',
                paddingBottom: '0',
                paddingLeft: '125px',
              }}>
              Sign In
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
