import React, { useCallback, useEffect } from 'react';
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
import ScholarshipData from '../types/ScholarshipData';
import { useTranslation } from 'react-i18next';
import { getAnalytics, logEvent } from 'firebase/analytics';

export default function ShareDialog({
  scholarship,
  open,
  onClose,
}: {
  scholarship: {
    id: string;
    data: ScholarshipData;
  };
  open: boolean;
  onClose: () => void;
}): JSX.Element {
  const { amount, deadline, name } = scholarship.data;
  const { t } = useTranslation('common');

  const url = `https://${window.location.hostname}/scholarships/${scholarship.id}`;
  const title = `${ScholarshipAmount.toString(
    amount
  )} - ${name} | ${BRAND_NAME}`;
  const text = `${title}\n ${deadline?.toLocaleDateString()}\n`;

  const logShare = useCallback(
    () => (p: string) =>
      logEvent(getAnalytics(), 'share', { platform: p, url, title, text }),
    [url, title, text]
  );
  useEffect(() => {
    if (open && navigator.share) {
      onClose();
      navigator
        .share({ url, title, text })
        .then(() => logShare()('navigator.share'))
        // eslint-disable-next-line no-console
        .catch(console.error);
    }
  }, [open, onClose, text, title, url, logShare]);

  return (
    <Dialog
      open={open && !navigator.share}
      onClose={onClose}
      sx={{ textAlign: 'center' }}>
      <DialogTitle
        sx={{ color: 'background.paper', bgcolor: 'background.secondary' }}>
        {t('actions.share')}
      </DialogTitle>
      <DialogContent sx={{ bgcolor: 'background.secondary' }}>
        <DialogContentText sx={{ color: 'background.paper' }}>
          {t('currentlySharing')}: {title}
        </DialogContentText>
        <EmailShareButton
          beforeOnClick={() => logShare()('email')}
          url={url}
          style={{ margin: '4px' }}>
          <EmailIcon round />
        </EmailShareButton>
        <FacebookShareButton
          beforeOnClick={() => logShare()('facebook')}
          url={url}
          style={{ margin: '4px' }}>
          <FacebookIcon round />
        </FacebookShareButton>
        <TwitterShareButton
          beforeOnClick={() => logShare()('twitter')}
          url={url}
          style={{ margin: '4px' }}>
          <TwitterIcon round />
        </TwitterShareButton>
        <LinkedinShareButton
          beforeOnClick={() => logShare()('linkedin')}
          url={url}
          style={{ margin: '4px' }}>
          <LinkedinIcon round />
        </LinkedinShareButton>
        <RedditShareButton
          beforeOnClick={() => logShare()('reddit')}
          url={url}
          style={{ margin: '4px' }}>
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
          onClick={() => {
            logShare()('clipboard');
            navigator.clipboard.writeText(url);
          }}>
          {t('actions.copyLink')}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
