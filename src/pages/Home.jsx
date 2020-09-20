import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const buttonStyles = {
  marginRight: '5px',
};

function Home() {
  return (
    <div className="App">
      <h1>Find Scholarships Today</h1>

      <Link to="/scholarships" style={buttonStyles}>
        <Button variant="contained" color="primary">Start Your Search</Button>
      </Link>

      <Link to="/about" style={buttonStyles}>
        <Button variant="contained" color="primary">About</Button>
      </Link>

      <Link to="/contact">
        <Button variant="contained" color="primary">Contact</Button>
      </Link>
    </div>
  );
}

export default Home;
