import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LoginDialog from './LoginDialog';

const buttonStyles = {
  margin: '5px',
};

function Header() {
  return (
    <div className="header">
      <Link to="/scholarships">
        <Button variant="contained" color="primary" style={buttonStyles}>Start Your Search</Button>
      </Link>

      <Link to="/about">
        <Button variant="contained" color="primary" style={buttonStyles}>About</Button>
      </Link>

      <Link to="/contact">
        <Button variant="contained" color="primary" style={buttonStyles}>Contact</Button>
      </Link>
      <LoginDialog />
    </div>
  );
}
export default Header;
