import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Link as MuiLink, Grid } from '@material-ui/core';
import LoginButton from './LoginButton';

const useStyles = makeStyles((theme) => ({
  menu: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItem: {
    color: theme.palette.text.secondary,
  },
}));

function HeaderNavMenu() {
  const classes = useStyles();
  const links = {
    Scholarships: '/scholarships',
    Add: '/scholarships/new',
    About: '/about',
    Contact: '/contact',
  };
  return (
    <Grid container spacing={3} className={classes.menu}>
      {Object.entries(links).map(([title, link]) => (
        <Grid item key={title}>
          <MuiLink component={Link} to={link} className={classes.menuItem}>
            {title}
          </MuiLink>
        </Grid>
      ))}
      <Grid item>
        <LoginButton className={classes.menuItem} />
      </Grid>
    </Grid>
  );
}

// TODO: Add the showLoginDialog p

export default HeaderNavMenu;
