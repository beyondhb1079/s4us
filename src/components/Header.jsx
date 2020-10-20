import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  makeStyles,
  Link as MuiLink,
  Typography,
  Grid,
} from '@material-ui/core';
import LoginButton from './LoginButton';

/* .header {
  text-align: right;
  color: white;
  margin-top: 0px;
  padding: 30px 35px 20px 25px;
  background: rgb(58, 56, 56);
  font-size: 15px;
  border-bottom: 7px solid #500966;
} */

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  logo: {
    color: theme.palette.text.primary,
  },
  menu: {
    float: 'right',
  },
  item: {
    // padding: theme.spacing(1),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
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
    <Container className={classes.root}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={6}>
          <MuiLink component={Link} to="/" variant="h3" underline="none">
            DREAMSCHOLARS
          </MuiLink>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.menu}>
          <Grid container spacing={3} justify="flex-end" alignItems="center">
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
