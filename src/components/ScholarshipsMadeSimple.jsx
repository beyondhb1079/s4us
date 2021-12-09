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
      {user === 'students' ? 'Browse Scholarships' : 'Submit A Scholarship'}
    </Button>
  );
}

const tabs = [
  {
    tab: 'students',
    title: 'No citizenship requirements',
    description:
      'Browse our database at ease knowing that none of our scholarships require you to be a U.S. citizen or permanent resident.',
    buttons: [OutlineButton('students')],
    pic: student,
    direction: 'row-reverse',
  },
  {
    tab: 'community contributor',
    title: 'Join and Support the Community',
    description:
      'Know a scholarship available for undocumented students not yet in our database? Sign up and add them to our database so students can find them!',
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
        Scholarship Search Made Simple
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
