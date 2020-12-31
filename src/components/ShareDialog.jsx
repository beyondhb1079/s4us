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
    background: '#333333',
    color: 'white',
    fontSize: '15px',
    width: '350px',
  },
}));

export default function ShareDialog(props) {
  const classes = useStyles();
  const { open, onClose, origin, title } = props;

  let link = `https://dreamerscholars.web.app/scholarships/${origin}`;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Share</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ color: 'black' }}>
          Currently Sharing: {title}
        </DialogContentText>
        <EmailShareButton url={link} className={classes.socialMediaButton}>
          <EmailIcon size={55} round />
        </EmailShareButton>
        <FacebookShareButton url={link} className={classes.socialMediaButton}>
          <FacebookIcon size={55} round />
        </FacebookShareButton>
        <TwitterShareButton url={link} className={classes.socialMediaButton}>
          <TwitterIcon size={55} round />
        </TwitterShareButton>
        <LinkedinShareButton url={link} className={classes.socialMediaButton}>
          <LinkedinIcon size={55} round />
        </LinkedinShareButton>
        <RedditShareButton url={link} className={classes.socialMediaButton}>
          <RedditIcon size={55} round />
        </RedditShareButton>
      </DialogContent>
    </Dialog>
  );
}

ShareDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  origin: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
