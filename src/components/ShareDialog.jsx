import React, { useEffect } from 'react';
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
import { BRAND_NAME } from '../config/constants';
import ScholarshipAmount from '../types/ScholarshipAmount';

export default function ShareDialog({ scholarship, open, onClose }) {
  const { amount, deadline, name } = scholarship.data;

  const url = `https://${window.location.hostname}/scholarships/${scholarship.id}`;
  const title = `${ScholarshipAmount.toString(
    amount
  )} - ${name} | ${BRAND_NAME}`;
  const text = `${title}\n ${deadline?.toLocaleDateString()}\n`;

  console.log('rerendering share');
  useEffect(() => {
    if (open && navigator.share) {
      onClose();
      navigator
        .share({ url, title, text })
        // eslint-disable-next-line no-console
        .then(() => console.log('Thanks for sharing!'))
        // eslint-disable-next-line no-console
        .catch(console.error);
    }
  }, [open, onClose, text, title, url]);

  return (
    <Dialog
      open={open && !navigator.share}
      onClose={onClose}
      sx={{ textAlign: 'center' }}>
      <DialogTitle
        sx={{ color: 'background.paper', bgcolor: 'background.secondary' }}>
        SHARE
      </DialogTitle>
      <DialogContent sx={{ bgcolor: 'background.secondary' }}>
        <DialogContentText sx={{ color: 'background.paper' }}>
          Currently Sharing: {title}
        </DialogContentText>
        <EmailShareButton url={url} style={{ m: '4px' }}>
          <EmailIcon round />
        </EmailShareButton>
        <FacebookShareButton url={url} style={{ m: '4px' }}>
          <FacebookIcon round />
        </FacebookShareButton>
        <TwitterShareButton url={url} style={{ m: '4px' }}>
          <TwitterIcon round />
        </TwitterShareButton>
        <LinkedinShareButton url={url} style={{ m: '4px' }}>
          <LinkedinIcon round />
        </LinkedinShareButton>
        <RedditShareButton url={url} style={{ m: '4px' }}>
          <RedditIcon round />
        </RedditShareButton>
        <Typography
          variant="overline"
          component="p"
          sx={{ color: (theme) => theme.palette.grey[600] }}>
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
