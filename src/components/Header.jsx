import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import LoginDialog from './LoginDialog';

const buttonStyles = {
  marginRight: '5px',
};

function Header() {
  return (
    <div className="header">
      <Link to="/scholarships" style={buttonStyles}>
        <Button variant="contained" color="primary">Start Your Search</Button>
      </Link>

      <Link to="/about" style={buttonStyles}>
        <Button variant="contained" color="primary">About</Button>
      </Link>

      <Link to="/contact">
        <Button variant="contained" color="primary">Contact</Button>
      </Link>
      <LoginDialog />
    </div>
  );
}
export default Header;
