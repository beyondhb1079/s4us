import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FirebaseLoginScreen from './FirebaseLoginScreen';

export default function LoginDialog() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">Login using your account or email.</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can login using your existing account to authenticate and log in to
            our web-app. You can create an account if you do not want to use your
            existing account to interact with our app.
          </DialogContentText>
          <FirebaseLoginScreen />
        </DialogContent>
      </Dialog>
    </div>
  );
}
