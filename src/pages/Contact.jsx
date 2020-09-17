import React from 'react';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

function Contact() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Contact Us</h1>

      <h3>Check Our FAQ</h3>
      <p>
        Check our
        <Link to="/">FAQ</Link>
        {' '}
        to see if others have the same question as you.
      </p>

      <h3>Found a bug</h3>
      <p>
        If you found a bug you can file it here
        <a href="https://github.com/beyondhb1079/s4us/issues">here</a>
        .
      </p>

      <h3>Learn About Us</h3>
      <p>
        You can learn more about us
        <Link to="/about">here</Link>
        .
      </p>

      <h3>Reach Out</h3>
      <p>
        We are happy to answer any of your questions. Fill out the form and we&apos;ll be in
        touch as soon as possible.
      </p>
      <form>
        <div><TextField id="standard-basic" label="full name" /></div>
        <div><TextField id="standard-basic" label="email" /></div>
        <div><TextField id="standard-basic" label="subject" /></div>
        <div><TextareaAutosize rowsMin={10} placeholder="Message" /></div>
        <Button variant="contained" color="primary">Submit</Button>
      </form>
    </div>
  );
}

export default Contact;
