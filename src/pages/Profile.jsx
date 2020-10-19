import React from 'react';
import Favorites from '../components/Profile/Favorites';
import UserModule from '../components/Profile/UserModule';

import '../components/Profile/styles/profile.css';

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
