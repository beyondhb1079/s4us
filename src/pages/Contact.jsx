import React from 'react';
import {
  isMobile,
  osVersion,
  osName,
  fullBrowserVersion,
  browserName,
  deviceType,
  mobileVendor,
  mobileModel,
} from 'react-device-detect';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { BRAND_NAME } from '../config/constants';

function Contact() {
  const mobileInfo = `Device Type: ${deviceType} Vendor: ${mobileVendor} Model: ${mobileModel}`;
  const deviceInfo = `OS Name: ${osName}%0AOSVersion: ${osVersion}%0ABrowser: ${browserName}%0ABrowser Version: ${fullBrowserVersion}%0A${
    isMobile ? mobileInfo : ''
  }`;

  function emailLink(LinkText) {
    return (
      <a
        href={`mailto:dreamscholars-contact@googlegroups.com?subject=Bug%20Report&body=${deviceInfo}`}>
        {LinkText}
      </a>
    );
  }

  return (
    <Container>
      <h1>{deviceInfo}</h1>
      <h1 style={{ textAlign: 'center' }}>Contact Us</h1>

      <h3>Check Our FAQ</h3>
      <p>
        You can check our <Link to="/">FAQ</Link> to see if others have the same
        question as you.
      </p>

      <h3>Found a bug</h3>
      <p>If you found a bug you can file it {emailLink('here')}</p>

      <h3>Learn About Us</h3>
      <p>
        You can learn more about {BRAND_NAME} and the developers{' '}
        <Link to="/about">here</Link> .
      </p>

      <h3>Reach Out</h3>
      <p>
        We are happy to answer any of your questions. You can email us{' '}
        <a href="mailto:dreamscholars-contact@googlegroups.com?subject=Feature&body=">
          here
        </a>{' '}
        and we&apos;ll be in touch as soon as possible.
      </p>
    </Container>
  );
}

export default Contact;
