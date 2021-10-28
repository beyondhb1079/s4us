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

function Contact() {
  return (
    <Container>
      <Helmet>
        <title>Contact</title>
      </Helmet>

      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>

      <Typography variant="h5" gutterBottom>
        Found a bug?
      </Typography>
      <Typography paragraph>
        You can file it{' '}
        <MuiLink
          href={genMailToLink({
            subject: 'Bug Report',
            body: withDeviceInfo(reportIssue),
          })}>
          here
        </MuiLink>
        .
      </Typography>

      <Typography variant="h5" gutterBottom>
        Feature Requests
      </Typography>
      <Typography paragraph>
        You can suggest an idea for this project{' '}
        <MuiLink
          href={genMailToLink({
            subject: 'Feature Request',
            body: withDeviceInfo(featureRequest),
          })}>
          here
        </MuiLink>
        .
      </Typography>

      <Typography variant="h5" gutterBottom>
        Learn About Us
      </Typography>
      <Typography paragraph>
        You can learn more about {BRAND_NAME} and the developers{' '}
        <MuiLink component={Link} to="/about">
          here
        </MuiLink>
        .
      </Typography>

      <Typography variant="h5" gutterBottom>
        Subscribe
      </Typography>
      <Typography paragraph>
        You can subscribe for updates{' '}
        <MuiLink href={SUBSCRIPTION_FORM_URL}>here</MuiLink>.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Reach Out
      </Typography>
      <Typography paragraph>
        We are happy to answer any of your questions. You can email us{' '}
        <MuiLink
          href={genMailToLink({
            subject: 'Outreach',
            body: 'Please describe the purpose of your outreach below.\n',
          })}>
          here
        </MuiLink>{' '}
        and we&apos;ll be in touch as soon as possible.
      </Typography>
    </Container>
  );
}

export default Contact;
