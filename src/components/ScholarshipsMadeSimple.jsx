import React from 'react';
import { Link } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import { AppBar, Button, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import HomeSection from './HomeSection';
import student from '../img/student.png';
import contributor from '../img/contributor.png';
import { useTranslation } from 'react-i18next';
import { BRAND_NAME } from '../config/constants';

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

function OutlineButton(user, t) {
  return (
    <Button
      variant="outlined"
      color="primary"
      component={Link}
      to={user === 'students' ? '/scholarships' : '/scholarships/new'}>
      {user === 'students' ? t('btn.browse') : t('btn.add')}
    </Button>
  );
}

export default function ScholarshipsMadeSimpleSection() {
  const { t } = useTranslation();
  const tabs = [
    {
      tab: t('home.public.studentTab.tab'),
      title: t('home.public.studentTab.title'),
      description: t('home.public.studentTab.description', {
        brand: BRAND_NAME,
      }),
      buttons: [
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={{ state: { showLoginDialog: true } }}
          replace>
          {t('btn.login')}
        </Button>,
        OutlineButton('students', t),
      ],
      pic: student,
    },
    {
      tab: t('home.public.communityTab.tab'),
      title: t('home.public.communityTab.title'),
      description: t('home.public.communityTab.description'),
      buttons: [OutlineButton('community contributor', t)],
      pic: contributor,
    },
  ];

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
        {t('home.public.madeSimple')}
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
