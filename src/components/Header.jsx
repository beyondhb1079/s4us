import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  makeStyles,
  Link as MuiLink,
  Grid,
} from '@material-ui/core';
import LoginButton from './LoginButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    justifyContent: 'space-between',
  },
  logo: {
    float: 'left',
    justify: 'space-between',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      justifyContent: 'center',
    },
  },
  menu: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  item: {
    color: theme.palette.text.secondary,
  },
}));

function Header() {
  const classes = useStyles();
  const links = {
    Scholarships: '/scholarships',
    About: '/about',
    Contact: '/contact',
  };
  return (
    <Container>
      <Grid container className={classes.root} spacing={3} alignItems="center">
        <Grid item xs={12} sm={6} className={classes.logo}>
          <MuiLink component={Link} to="/" variant="h4" underline="none">
            DREAMSCHOLARS
          </MuiLink>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container spacing={3} className={classes.menu}>
            {Object.entries(links).map(([title, link]) => (
              <Grid item>
                <MuiLink component={Link} to={link} className={classes.item}>
                  {title}
                </MuiLink>
              </Grid>
            ))}
            <Grid item>
              <LoginButton className={classes.item} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Header;
