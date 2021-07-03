import React from 'react';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import getMailToLink from '../lib/Mailto';
import {
  deviceInfo,
  featureRequest,
  BRAND_NAME,
  SUBSCRIPTION_FORM_URL,
} from '../config/constants';

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
        <a href={getMailToLink({ subject: 'Bug Report', body: deviceInfo })}>
          here.
        </a>
      </p>

      <h3>Feature Request</h3>
      <p>
        You can suggest an idea for this project{' '}
        <a
          href={getMailToLink({
            subject: 'Feature Request',
            body: featureRequest,
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
          href={getMailToLink({
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
