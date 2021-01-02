import React from 'react';
import PropTypes from 'prop-types';
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

export default function ShareDialog(props) {
  const classes = useStyles();
  const { open, onClose, link, title } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className={classes.root}>SHARE</DialogTitle>
      <DialogContent className={classes.root}>
        <DialogContentText className={classes.root}>
          Currently Sharing: {title}
        </DialogContentText>
        <EmailShareButton url={link} className={classes.shareIcon}>
          <EmailIcon round />
        </EmailShareButton>
        <FacebookShareButton url={link} className={classes.shareIcon}>
          <FacebookIcon round />
        </FacebookShareButton>
        <TwitterShareButton url={link} className={classes.shareIcon}>
          <TwitterIcon round />
        </TwitterShareButton>
        <LinkedinShareButton url={link} className={classes.shareIcon}>
          <LinkedinIcon round />
        </LinkedinShareButton>
        <RedditShareButton url={link} className={classes.shareIcon}>
          <RedditIcon round />
        </RedditShareButton>
        <Typography
          variant="overline"
          component="h1"
          className={classes.copyText}>
          {link}
        </Typography>
        <Button
          color="primary"
          onClick={() => {
            navigator.clipboard.writeText(`${link}`);
          }}>
          Copy
        </Button>
      </DialogContent>
    </Dialog>
  );
}

ShareDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
