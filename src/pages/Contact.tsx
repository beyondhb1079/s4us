import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  featureRequest,
  genMailToLink,
  reportIssue,
  withDeviceInfo,
} from '../lib/mail';
import { BRAND_NAME, SUBSCRIPTION_FORM_URL } from '../config/constants';
import { Container, Link as MuiLink, Typography } from '@mui/material';
import { useTranslation, Trans } from 'react-i18next';

function Contact(): JSX.Element {
  const { t } = useTranslation('contact');

  return (
    <Container sx={{ p: 2 }}>
      <Helmet>
        <title>{t('titleTag')}</title>
      </Helmet>

      <Typography variant="h4" align="center" gutterBottom>
        {t('contactUs')}
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('foundBug')}
      </Typography>
      <Typography paragraph>
        <Trans ns="contact" i18nKey="fileBug">
          You can file it
          <MuiLink
            href={genMailToLink({
              subject: 'Bug Report',
              body: withDeviceInfo(reportIssue),
            })}>
            here
          </MuiLink>
        </Trans>
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('featureReq')}
      </Typography>
      <Typography paragraph>
        <Trans ns="contact" i18nKey="featureSuggest">
          You can suggest an idea for this project
          <MuiLink
            href={genMailToLink({
              subject: 'Feature Request',
              body: withDeviceInfo(featureRequest),
            })}>
            here
          </MuiLink>
        </Trans>
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('learnAboutUs')}
      </Typography>
      <Typography paragraph>
        <Trans ns="contact" i18nKey="learnMore" values={{ brand: BRAND_NAME }}>
          You can learn more about DreamScholars and the developers
          <MuiLink component={Link} to="/about">
            here.
          </MuiLink>
        </Trans>
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('subscribe')}
      </Typography>
      <Typography paragraph>
        <Trans ns="contact" i18nKey="subForUpdates">
          You can subscribe for updates
          <MuiLink href={SUBSCRIPTION_FORM_URL}>here</MuiLink>
        </Trans>
      </Typography>

      <Typography variant="h5" gutterBottom>
        {t('reachOut')}
      </Typography>
      <Typography paragraph>
        <Trans ns="contact" i18nKey="emailUs">
          We are happy to answer any of your questions. You can email us
          <MuiLink
            href={genMailToLink({
              subject: 'Outreach',
              body: 'Please describe the purpose of your outreach below.\n',
            })}>
            here
          </MuiLink>
          and we&apos;ll be in touch as soon as possible.
        </Trans>
      </Typography>
    </Container>
  );
}

export default Contact;
