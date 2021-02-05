import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, Link as MuiLink, Grid } from '@material-ui/core';
import LoginButton from './LoginButton';

const useStyles = makeStyles((theme) => ({
  menu: {
    alignItems: 'right',
    justifyContent: 'center',
  },
  menuItem: {
    color: theme.palette.text.secondary,
  },
  avatarMenu: {
    minWidth: '100px',
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
      <Grid item className={classes.avatarMenu}>
        <LoginButton />
      </Grid>
    </Grid>
  );
}

export default HeaderNavMenu;
