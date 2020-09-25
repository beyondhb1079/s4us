import React from 'react';
import DummyData from '../components/DummyData';
import ProfileStepper from '../components/ProfileStepper';

function Home() {
  return (
    <div className="App">
      <h1>Find Scholarships Today</h1>
      <ProfileStepper />
      <h1>Fetching Data from Firestore:</h1>
      <DummyData />
    </div>
  );
}

export default Home;
