import React from 'react';
import Cards from '../components/Profile/Cards';
import Favorites from '../components/Profile/Favorites';

// made for testing with Router, can be deleted by whoever is doing the HomePage
function UserProfile() {
  return (
      <div>
      <h1>User_profile</h1>
      <Cards />
      <Favorites />
      </div>
  );
}

export default UserProfile;
