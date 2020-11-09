import React from 'react';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';
import { BRAND_NAME } from '../config/constants';

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
        <a href="https://github.com/beyondhb1079/s4us/issues">here</a> .
      </p>

      <h3>Learn About Us</h3>
      <p>
        You can learn more about {BRAND_NAME} and the developers{' '}
        <Link to="/about">here</Link> .
      </p>

      <h3>Reach Out</h3>
      <p>
        We are happy to answer any of your questions. You can email us{' '}
        <a href="mailto:undocuscholar@googlegroups.com">here</a> and we&apos;ll
        be in touch as soon as possible.
      </p>
    </Container>
  );
}

export default Contact;
