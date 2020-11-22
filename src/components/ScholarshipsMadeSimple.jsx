import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabPanel from '@material-ui/lab/TabPanel';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LoginButton from './LoginButton';
import HomeSection from './HomeSection';
import pic from '../img/blank.png';

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
    //backgroundColor: 'black',
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
      to={user === 'students' ? '/scholarships' : '/scholarships/new'}
      buttonProperties>
      {user === 'students' ? 'Find Scholarships' : 'Submit A Scholarship'}
    </Button>
  );
}

const tabs = [
  {
    tab: 'students',
    title: 'Stress-free scholarships',
    description:
      'Et has minim eltir intellegat. Mea aeterno elefiend antiopam ad, nam no suscipit quaerendum. At name mininum ponderum. Est audiam animal molestiate te.',
    buttons: [<LoginButton />, OutlineButton('students')],
    pic: pic,
  },
  {
    tab: 'community contributor',
    title: 'Join and Support the Community',
    description:
      'Et has minim eltir intellegat. Mea aeterno elefiend antiopam ad, nam no suscipit quaerendum. At name mininum ponderum. Est audiam animal molestiate te.',
    buttons: [OutlineButton('community contributor')],
    pic: pic,
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
            <Tab value={tabs[1].tab} label="contributors" />
          </TabList>
        </AppBar>
        {tabs.map(({ tab, title, description, buttons, pic }) => (
          <TabPanel value={tab}>
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
