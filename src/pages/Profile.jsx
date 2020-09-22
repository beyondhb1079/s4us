import React from 'react';

// Profile Components
//import Cards from '../components/Profile/Cards';
import Favorites from '../components/Profile/Favorites';
import UserModule from '../components/Profile/UserModule';

// Profile page CSS
import "../components/Profile/styles/profile.css"

// Profile page structure should be here.

function UserProfile() {
  return (
      <div className="profile">
          <div className="user container">
              <UserModule />
          </div>
          <div className="favWrapper">
              <Favorites />
          </div>
      </div>
  );
}

export default UserProfile;
