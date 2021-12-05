import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Tab, Typography, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import HomeSection from './HomeSection';
import student from '../img/img5.svg';
import contributor from '../img/img1.svg';

function OutlineButton(user) {
  return (
    <Button
      variant="contained"
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
    buttons: [OutlineButton('students')],
    pic: student,
    direction: 'row-reverse',
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
  const [user, setUser] = React.useState(tabs[0].tab);

  const handleChange = (event, newUser) => setUser(newUser);

  return (
    <Box>
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: 'center', pt: 4 }}
        gutterBottom>
        Scholarships Made Simple
      </Typography>
      <TabContext value={user}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            background: 'inherit',
            color: (theme) => theme.palette.text.primary,
          }}>
          <TabList centered onChange={handleChange} indicatorColor="primary">
            <Tab value={tabs[0].tab} label="students" />
            <Tab value={tabs[1].tab} label="community contributors" />
          </TabList>
        </AppBar>
        {tabs.map(({ tab, title, description, buttons, pic, direction }) => (
          <TabPanel key={tab} value={tab}>
            <HomeSection {...{ title, description, buttons, pic, direction }} />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
