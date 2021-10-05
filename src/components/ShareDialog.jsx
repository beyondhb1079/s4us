import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
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

  const showShareDialog = location.state?.showShareDialog ?? false;
  const shareData = location.state?.shareData ?? {};
  const { title, url } = shareData;

  const history = useHistory();
  const closeDialog = () =>
    history.replace({
      state: { shareData },
    });

  const classes = useStyles();

  return (
    <Dialog open={showShareDialog} onClose={closeDialog}>
      <DialogTitle className={classes.root}>SHARE</DialogTitle>
      <DialogContent className={classes.root}>
        <DialogContentText className={classes.root}>
          Currently Sharing: {title}
        </DialogContentText>
        <EmailShareButton url={url} className={classes.shareIcon}>
          <EmailIcon round />
        </EmailShareButton>
        <FacebookShareButton url={url} className={classes.shareIcon}>
          <FacebookIcon round />
        </FacebookShareButton>
        <TwitterShareButton url={url} className={classes.shareIcon}>
          <TwitterIcon round />
        </TwitterShareButton>
        <LinkedinShareButton url={url} className={classes.shareIcon}>
          <LinkedinIcon round />
        </LinkedinShareButton>
        <RedditShareButton url={url} className={classes.shareIcon}>
          <RedditIcon round />
        </RedditShareButton>
        <Typography
          variant="overline"
          component="p"
          className={classes.copyText}
        >
          {url}
        </Typography>
        <Button
          color="primary"
          onClick={() => navigator.clipboard.writeText(url)}
        >
          Copy Link
        </Button>
      </DialogContent>
    </Dialog>
  );
}
