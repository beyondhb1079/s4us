import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import ScholarshipsMadeSimpleGrid from './ScholarshipsMadeSimpleGrid';

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function ScholarshipsMadeSimpleSection() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="stepperStyle">
      <Typography variant="h4" component="h4">
        Scholarships Made Simple
      </Typography>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        centered>
        <Tab label="Student" />
        <Tab label="Community Contributor" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ScholarshipsMadeSimpleGrid user={value} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ScholarshipsMadeSimpleGrid user={value} />
      </TabPanel>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.bool.isRequired,
  value: PropTypes.bool.isRequired,
  index: PropTypes.bool.isRequired,
};
