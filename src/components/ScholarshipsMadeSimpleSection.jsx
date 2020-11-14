import React from 'react';
import { Container } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import ScholarshipsMadeSimpleGrid from './ScholarshipsMadeSimpleContent';

const useStyles = makeStyles((theme) => ({
  style: {
    background: 'theme.palette.background.paper',
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.54)',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
}));

export default function ScholarshipsMadeSimpleSection() {
  const classes = useStyles();
  const [user, setUser] = React.useState('student');

  const handleChange = (event, newUser) => {
    setUser(newUser);
  };

  return (
    <Container className={classes.style}>
      <Typography variant="h4" component="h4" style={{ textAlign: 'center' }}>
        Scholarships Made Simple
      </Typography>
      <TabContext value={user}>
        <AppBar position="static">
          <TabList
            onChange={handleChange}
            centered
            style={{ color: 'black', background: 'whitesmoke' }}>
            <Tab value="student" label="students" />
            <Tab value="contributor" label="contributors" />
          </TabList>
        </AppBar>
        <TabPanel value="student" index={0}>
          <ScholarshipsMadeSimpleGrid user="students" />
        </TabPanel>
        <TabPanel value="contributor" index={1}>
          <ScholarshipsMadeSimpleGrid user="contributors" />
        </TabPanel>
      </TabContext>
    </Container>
  );
}

TabPanel.propTypes = {
  children: PropTypes.bool.isRequired,
  value: PropTypes.bool.isRequired,
  index: PropTypes.bool.isRequired,
};
