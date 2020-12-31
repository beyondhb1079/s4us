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
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.secondary,
    color: 'white',
    fontSize: '15px',
    textAlign: 'center',
  },
  shareIcon: {
    maringRight: '15px',
  },
}));

export default function ShareDialog(props) {
  const classes = useStyles();
  const { open, onClose, link, title } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className={classes.root}>Share</DialogTitle>
      <DialogContent className={classes.root}>
        <DialogContentText className={classes.root}>
          Currently Sharing: {title}
        </DialogContentText>
        <EmailShareButton url={link}>
          <EmailIcon size={55} round />
        </EmailShareButton>
        <FacebookShareButton url={link}>
          <FacebookIcon size={55} round />
        </FacebookShareButton>
        <TwitterShareButton url={link}>
          <TwitterIcon size={55} round />
        </TwitterShareButton>
        <LinkedinShareButton url={link}>
          <LinkedinIcon size={55} round />
        </LinkedinShareButton>
        <RedditShareButton url={link}>
          <RedditIcon size={55} round />
        </RedditShareButton>
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
