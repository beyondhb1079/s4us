import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@material-ui/core';
import {
  FacebookShareButton,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.secondary,
    color: 'white',
    textAlign: 'center',
  },
  shareIcon: {
    marginRight: theme.spacing(1),
  },
  copyText: {
    color: '#808080',
  },
}));

export default function ShareDialog() {
  const location = useLocation();
  const { showShareDialog, shareTitle, shareURL } = location.state
    ?.shareDialog || {
    showShareDialog: false,
  };

  const history = useHistory();
  const closeDialog = () =>
    history.replace({
      state: { shareDialog: { shareTitle, shareURL, showShareDialog: false } },
    });

  const classes = useStyles();

  return (
    <Dialog open={showShareDialog} onClose={closeDialog}>
      <DialogTitle className={classes.root}>SHARE</DialogTitle>
      <DialogContent className={classes.root}>
        <DialogContentText className={classes.root}>
          Currently Sharing: {shareTitle}
        </DialogContentText>
        <EmailShareButton url={shareURL} className={classes.shareIcon}>
          <EmailIcon round />
        </EmailShareButton>
        <FacebookShareButton url={shareURL} className={classes.shareIcon}>
          <FacebookIcon round />
        </FacebookShareButton>
        <TwitterShareButton url={shareURL} className={classes.shareIcon}>
          <TwitterIcon round />
        </TwitterShareButton>
        <LinkedinShareButton url={shareURL} className={classes.shareIcon}>
          <LinkedinIcon round />
        </LinkedinShareButton>
        <RedditShareButton url={shareURL} className={classes.shareIcon}>
          <RedditIcon round />
        </RedditShareButton>
        <Typography
          variant="overline"
          component="p"
          className={classes.copyText}>
          {shareURL}
        </Typography>
        <Button
          color="primary"
          onClick={() => navigator.clipboard.writeText(shareURL)}>
          Copy Link
        </Button>
      </DialogContent>
    </Dialog>
  );
}
