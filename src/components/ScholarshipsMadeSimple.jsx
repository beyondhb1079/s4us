import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/lab/TabPanel';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import LoginButton from './LoginButton';
import HomeSection from './HomeSection';
import pic from '../img/blank.png';

const useStyles = makeStyles(() => ({
  container: {
    background: 'theme.palette.background.paper',
    textAlign: 'left',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
}));

function ButtonList(user) {
  return (
    <>
      {user === 'students' && <LoginButton />}
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        style={{ marginLeft: '20px' }}
        to={user === 'students' ? '/scholarships' : '/scholarships/new'}
        buttonProperties>
        {user === 'students' ? 'Find Scholarships' : 'Submit A Scholarship'}
      </Button>
    </>
  );
}

const content = {
  0: {
    direction: 'row',
    tab: 'students',
    title: 'Stress-free scholarships',
    description:
      'Et has minim eltir intellegat. Mea aeterno elefiend antiopam ad, nam no suscipit quaerendum. At name mininum ponderum. Est audiam animal molestiate te.',
    button: ButtonList('students'),
    picture: pic,
  },
  1: {
    direction: 'row',
    tab: 'community contributor',
    title: 'Join and Support the Community',
    description:
      'Et has minim eltir intellegat. Mea aeterno elefiend antiopam ad, nam no suscipit quaerendum. At name mininum ponderum. Est audiam animal molestiate te.',
    button: ButtonList('community contributor'),
    picture: pic,
  },
};

export default function ScholarshipsMadeSimpleSection() {
  const classes = useStyles();
  const [user, setUser] = React.useState('student');

  const handleChange = (event, newUser) => setUser(newUser);

  return (
    <Container className={classes.container}>
      <Typography variant="h4" component="h4" style={{ textAlign: 'center' }}>
        Scholarships Made Simple
      </Typography>
      <TabContext value={user}>
        <AppBar position="static">
          <TabList centered onChange={handleChange}>
            <Tab value="student" label="students" />
            <Tab value="contributor" label="contributors" />
          </TabList>
        </AppBar>
        <TabPanel value="student" index={0}>
          <HomeSection
            direction={content[0].direction}
            tab={content[0].tab}
            title={content[0].title}
            description={content[0].description}
            button={content[0].button}
            pic={content[0].picture}
          />
        </TabPanel>
        <TabPanel value="contributor" index={1}>
          <HomeSection
            direction={content[1].direction}
            tab={content[1].tab}
            title={content[1].title}
            description={content[1].description}
            button={content[1].button}
            pic={content[1].picture}
          />
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
