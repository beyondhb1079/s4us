import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CommunityGrid from './CommunityGrid';
import StudentGrid from './StudentGrid';

export default function ProfileDisplay() {
  const [user, setUser] = React.useState(0);

  const handleChange = (event, newUser) => {
    setUser(newUser);
  };

  function displaySelection(userSelected) {
    if (userSelected === 0) {
      return <StudentGrid />
    }
    return <CommunityGrid />
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
