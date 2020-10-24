import React from 'react';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import LoginButton from './LoginButton';

const buttonStyles = {
  margin: '5px',
};

function Header() {
  const match = window.location.hostname.match(/s4us-pr-(\d+).onrender.com/);
  let alert = '';
  if (match !== null) {
    const link = `https://github.com/beyondhb1079/s4us/pulls/${match[1]}`;
    alert = (
      <Alert severity="info">
        This is a preview of <a href={link}>Pull Request #{match[1]}</a>
      </Alert>
    );
  }
  return (
    <div className="header">
      {alert}
      <Link to="/scholarships">
        <Button variant="contained" color="primary" style={buttonStyles}>
          Start Your Search
        </Button>
      </Link>

      <Link to="/about">
        <Button variant="contained" color="primary" style={buttonStyles}>
          About
        </Button>
      </Link>

      <Link to="/contact">
        <Button variant="contained" color="primary" style={buttonStyles}>
          Contact
        </Button>
      </Link>
      <Link to="/scholarships/new">
        <Button variant="contained" color="primary" style={buttonStyles}>
          Add Scholarship
        </Button>
      </Link>
      <LoginButton />
    </div>
  );
}

export default Header;
