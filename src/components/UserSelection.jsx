import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ProfileStepper from './ProfileStepper';

export default function UserSelection() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function displaySelection(select) {
    if (select === 0) {
      return <ProfileStepper />;
    }
    return <h4>Pending Organization Implementation</h4>;
  }

  return (
    <Paper square>
      <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={handleChange} aria-label="disabled tabs example">
        <Tab label="Student" />
        <Tab label="Organization" />
      </Tabs>
      {displaySelection(value)}
    </Paper>
  );
}