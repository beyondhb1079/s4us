import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function UserSelection() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function displaySelection(select) {
    if (select === 0) {
      return <h3>Students</h3>;
    }
    return <h3>Organization</h3>;
  }

  return (
    <div className="stepperStyle">
      <Paper square>
        <Tabs value={value} indicatorColor="primary" textColor="primary" onChange={handleChange} aria-label="disabled tabs example">
          <Tab label="Student" />
          <Tab label="Community Contributor" />
        </Tabs>
        <h4>Welcome to DreamerScholar, we are dedicated to providing undocumented students
            access to scholarships to have the opportunity to succeed in their educational path.</h4>
        {displaySelection(value)}
      </Paper>
    </div>
  );
}
