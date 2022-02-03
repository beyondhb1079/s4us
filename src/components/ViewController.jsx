import React from 'react';
import { Container, Grid, Link as MuiLink } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import { Link } from 'react-router-dom';
import DesktopHeader from './Header';
import Sidebar from './Sidebar';
import { BRAND_NAME } from '../config/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flex: '1 0 auto',
    margin: theme.spacing(1),
  },
}));

function BreakpointOnly() {
  const classes = useStyles();

  return (
    <Container
      style={{
        background: 'theme.palette.background.paper',
        alignItems: 'center',
        paddingTop: '15px',
      }}
      className={classes.root}>
      <div className={classes.container}>
        <Hidden only={['md', 'lg', 'xl']}>
          <Grid container className={classes.header} spacing={3}>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <MuiLink component={Link} to="/" variant="h4" underline="none">
                {BRAND_NAME.toUpperCase()}
              </MuiLink>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
              <Sidebar />
            </Grid>
          </Grid>
        </Hidden>

        <Hidden only={['sm', 'xs']}>
          <DesktopHeader />
        </Hidden>
      </div>
    </Container>
  );
}

BreakpointOnly.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(BreakpointOnly);
