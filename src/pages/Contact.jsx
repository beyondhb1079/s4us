import React from 'react';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import {
  genMailToLink,
  deviceInfo,
  reportIssue,
  featureRequest,
  emailTemplate,
} from '../lib/mail';
import { BRAND_NAME, SUBSCRIPTION_FORM_URL } from '../config/constants';

function Contact() {
  return (
    <Container>
      <h1 style={{ textAlign: 'center' }}>Contact Us</h1>

      <h3>Check Our FAQ</h3>
      <p>
        You can check our <Link to="/">FAQ</Link> to see if others have the same
        question as you.
      </p>

      <h3>Found a bug</h3>
      <p>
        If you found a bug you can file it{' '}
        <a
          href={genMailToLink({
            subject: 'Bug Report',
            body: emailTemplate(deviceInfo, reportIssue),
          })}>
          here.
        </a>
      </p>

      <h3>Feature Request</h3>
      <p>
        You can suggest an idea for this project{' '}
        <a
          href={genMailToLink({
            subject: 'Feature Request',
            body: emailTemplate(deviceInfo, featureRequest),
          })}>
          here.
        </a>
      </p>

      <h3>Learn About Us</h3>
      <p>
        You can learn more about {BRAND_NAME} and the developers{' '}
        <Link to="/about">here</Link>.
      </p>
      <h3>Subscribe</h3>
      <p>
        You can subscribe for updates <a href={SUBSCRIPTION_FORM_URL}>here</a>.
      </p>

      <h3>Reach Out</h3>
      <p>
        We are happy to answer any of your questions. You can email us{' '}
        <a
          href={genMailToLink({
            subject: 'Outreach',
            body: 'Please describe the purpose of your outreach below.\n',
          })}>
          here
        </a>{' '}
        and we&apos;ll be in touch as soon as possible.
      </p>
    </Container>
  );
}

export default Contact;
