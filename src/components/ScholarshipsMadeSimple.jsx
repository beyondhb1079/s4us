import React from 'react';
import { Link } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeSection from './HomeSection';
import student from '../img/student.png';
import contributor from '../img/contributor.png';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  appBar: {
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  description: {
    textAlign: 'center',
    paddingTop: theme.spacing(4),
  },
}));

function OutlineButton(user) {
  return (
    <Button
      variant="outlined"
      color="primary"
      component={Link}
      to={user === 'students' ? '/scholarships' : '/scholarships/new'}>
      {user === 'students' ? 'Find Scholarships' : 'Submit A Scholarship'}
    </Button>
  );
}

const tabs = [
  {
    tab: 'students',
    title: 'Stress-free scholarships',
    description:
      'DreamScholars helps anyone find scholarships, regardless of status. Our community does the heavy lifting to make your scholarship search easy and stress-free.',
    buttons: [
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={{ state: { showLoginDialog: true } }}
        replace>
        Login
      </Button>,
      OutlineButton('students'),
    ],
    pic: student,
  },
  {
    tab: 'community contributor',
    title: 'Join and Support the Community',
    description:
      'As members of the community we are passionate about contributing to opening opportunites too as many people possible. Our college experience has lead us to initialize a web platform for connecting students with scholarships. We would be beyond thrilled if we recieved support from the community to keep the scholarships up to date and fully functioning by becoming part of the team.',
    buttons: [OutlineButton('community contributor')],
    pic: contributor,
  },
];

export default function ScholarshipsMadeSimpleSection() {
  const classes = useStyles();
  const [user, setUser] = React.useState(tabs[0].tab);

  const handleChange = (event, newUser) => setUser(newUser);

  return (
    <div className={classes.root}>
      <Typography
        variant="h4"
        component="h4"
        className={classes.description}
        gutterBottom>
        Scholarships Made Simple
      </Typography>
      <TabContext value={user}>
        <AppBar position="static" elevation={0} className={classes.appBar}>
          <TabList centered onChange={handleChange} indicatorColor="primary">
            <Tab value={tabs[0].tab} label="students" />
            <Tab value={tabs[1].tab} label="community contributors" />
          </TabList>
        </AppBar>
        {tabs.map(({ tab, title, description, buttons, pic }) => (
          <TabPanel key={tab} value={tab}>
            <HomeSection
              direction="row"
              {...{ tab, title, description, buttons, pic }}
            />
          </TabPanel>
        ))}
      </TabContext>
    </div>
  );
}
