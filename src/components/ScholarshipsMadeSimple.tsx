import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Tab, Typography, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import HomeSection from './HomeSection';
import student from '../img/img5.svg';
import contributor from '../img/img1.svg';
import { TFunction, useTranslation } from 'react-i18next';

function OutlineButton(
  user: string,
  t: TFunction<('home' | 'common')[], undefined>,
): JSX.Element {
  return (
    <Button
      variant="contained"
      color="primary"
      component={Link}
      to={user === 'students' ? '/scholarships' : '/scholarships/new'}>
      {user === 'students'
        ? t('common:actions.browseScholarships')
        : t('common:actions.addScholarship')}
    </Button>
  );
}

export default function ScholarshipsMadeSimpleSection(): JSX.Element {
  const { t } = useTranslation(['home', 'common']);
  const tabs = [
    {
      tab: 'students',
      title: t('studentTab.title'),
      description: t('studentTab.description'),
      buttons: [OutlineButton('students', t)],
      pic: student,
      direction: 'row-reverse',
    },
    {
      tab: 'community contributor',
      title: t('communityTab.title'),
      description: t('communityTab.description'),
      buttons: [OutlineButton('community contributor', t)],
      pic: contributor,
    },
  ];

  const [user, setUser] = React.useState(tabs[0].tab);

  const handleChange = (
    _: React.SyntheticEvent,
    newUser: React.SetStateAction<string>,
  ) => setUser(newUser);

  return (
    <Box>
      <Typography
        variant="h4"
        component="h4"
        sx={{ textAlign: 'center', pt: 4 }}
        gutterBottom>
        {t('madeSimple')}
      </Typography>
      <TabContext value={user}>
        <AppBar
          position="static"
          variant="elevation"
          elevation={0}
          sx={{
            background: 'inherit',
            color: (theme) => theme.palette.text.primary,
          }}>
          <TabList centered onChange={handleChange} indicatorColor="primary">
            <Tab value={tabs[0].tab} label={t('studentTab.tab')} />
            <Tab value={tabs[1].tab} label={t('communityTab.tab')} />
          </TabList>
        </AppBar>
        {tabs.map(({ tab, title, description, buttons, pic, direction }) => (
          <TabPanel key={tab} value={tab}>
            <HomeSection
              direction={direction as 'row-reverse' | undefined}
              {...{ title, description, buttons, pic }}
            />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
