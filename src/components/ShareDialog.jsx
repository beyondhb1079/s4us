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
  const { open, onClose, urlLink, scholarshipName } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Share</DialogTitle>
      <DialogContent>
        <DialogContentText style={{ color: 'black' }}>
          Currently Sharing: {scholarshipName}
        </DialogContentText>
        <EmailShareButton url={urlLink} className={classes.socialMediaButton}>
          <EmailIcon size={55} round />
        </EmailShareButton>
        <FacebookShareButton
          url={urlLink}
          className={classes.socialMediaButton}>
          <FacebookIcon size={55} round />
        </FacebookShareButton>
        <TwitterShareButton url={urlLink} className={classes.socialMediaButton}>
          <TwitterIcon size={55} round />
        </TwitterShareButton>
        <LinkedinShareButton
          url={urlLink}
          className={classes.socialMediaButton}>
          <LinkedinIcon size={55} round />
        </LinkedinShareButton>
        <RedditShareButton url={urlLink} className={classes.socialMediaButton}>
          <RedditIcon size={55} round />
        </RedditShareButton>
      </DialogContent>
    </Dialog>
  );
}

ShareDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  urlLink: PropTypes.string.isRequired,
  scholarshipName: PropTypes.string.isRequired,
};
