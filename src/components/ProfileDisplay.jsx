import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function ProfileDisplay() {
  const [user, setUser] = React.useState(0);

  const handleChange = (event, newUser) => {
    setUser(newUser);
  };

  function displaySelection(userSelected) {
    if (userSelected === 0) {
      return studentIntro();
    }
    return communityIntro();
  }

  function studentIntro() {
    return <div>
      <h3>Students,</h3>
      <h4>
        Welcome to DreamerScholar, we are dedicated to providing undocumented students
        access to scholarships to have the opportunity to succeed in their educational path.
        </h4>
    </div>
  }

  function communityIntro() {
    return <div>
      <h3>Community Contributor</h3>
      <h4>
        Welcome to DreamerScholar, we are dedicated to providing undocumented students
        access to scholarships to have the opportunity to succeed in their educational path.
        </h4>
    </div>
  }

  return (
    <div className="stepperStyle">
      <Paper square>
        <Tabs value={user} indicatorColor="primary" textColor="primary" onChange={handleChange}>
          <Tab label="Student" />
          <Tab label="Community Contributor" />
        </Tabs>
        {displaySelection(user)}
      </Paper>
    </div>
  );
}
