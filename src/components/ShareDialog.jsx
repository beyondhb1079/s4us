import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

export default function ShareDialog() {
  const location = useLocation();

  const showShareDialog = location.state?.showShareDialog ?? false;
  const shareData = location.state?.shareData ?? {};
  const { title, url } = shareData;

  const history = useHistory();
  const closeDialog = () => history.replace({ state: { shareData } });

  return (
    <Dialog
      open={showShareDialog}
      onClose={closeDialog}
      sx={{ textAlign: 'center' }}>
      <DialogTitle sx={{ color: 'white', bgcolor: 'background.secondary' }}>
        SHARE
      </DialogTitle>
      <DialogContent sx={{ bgcolor: 'background.secondary' }}>
        <DialogContentText sx={{ color: 'white' }}>
          Currently Sharing: {title}
        </DialogContentText>
        <EmailShareButton url={url} style={{ margin: '4px' }}>
          <EmailIcon round />
        </EmailShareButton>
        <FacebookShareButton url={url} style={{ margin: '4px' }}>
          <FacebookIcon round />
        </FacebookShareButton>
        <TwitterShareButton url={url} style={{ margin: '4px' }}>
          <TwitterIcon round />
        </TwitterShareButton>
        <LinkedinShareButton url={url} style={{ margin: '4px' }}>
          <LinkedinIcon round />
        </LinkedinShareButton>
        <RedditShareButton url={url} style={{ margin: '4px' }}>
          <RedditIcon round />
        </RedditShareButton>
        <Typography variant="overline" component="p" sx={{ color: '#808080' }}>
          {url}
        </Typography>
        <Button
          color="primary"
          onClick={() => navigator.clipboard.writeText(url)}>
          Copy Link
        </Button>
      </DialogContent>
    </Dialog>
  );
}
