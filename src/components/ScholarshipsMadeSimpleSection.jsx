import React from 'react';
import { Container } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import ScholarshipsMadeSimpleGrid from './ScholarshipsMadeSimpleContent';

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
    <Container style={{ background: 'theme.palette.background.paper' }}>
      <Typography variant="h4" component="h4" style={{ textAlign: 'center' }}>
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
        <ScholarshipsMadeSimpleGrid user="students" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ScholarshipsMadeSimpleGrid user="contributors" />
      </TabPanel>
    </Container>
  );
}

TabPanel.propTypes = {
  children: PropTypes.bool.isRequired,
  value: PropTypes.bool.isRequired,
  index: PropTypes.bool.isRequired,
};
