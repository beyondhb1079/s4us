import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

const useStyles = makeStyles((theme) => ({
  dialogRoot: {
    backgroundColor: '#333333',
    color: 'white',
    fontSize: '15px',
    width: '450px',
  },
}));

export default function ShareDialog(props) {
  const classes = useStyles();
  const { open, onClose, urlLink } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title">
      <DialogTitle className={classes.dialogRoot}>Share</DialogTitle>
      <DialogContent className={classes.dialogRoot}>
        <EmailShareButton url={urlLink} className={classes.socialMediaButton}>
          <EmailIcon size={55} round />
        </EmailShareButton>
        <FacebookShareButton
          url={urlLink}
          className={classes.socialMediaButton}>
          <FacebookIcon size={55} round />
        </FacebookShareButton>
        <LinkedinShareButton
          url={urlLink}
          className={classes.socialMediaButton}>
          <LinkedinIcon size={55} round />
        </LinkedinShareButton>
        <DialogContentText className={classes.dialogRoot}>
          Copy of link pending here
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

ShareDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  urlLink: PropTypes.string.isRequired,
};
