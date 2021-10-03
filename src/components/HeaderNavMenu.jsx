import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { makeStyles, Tab, Tabs } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tab: {
    minWidth: 72,
    marginRight: theme.spacing(0),
    [theme.breakpoints.down('sm')]: {
      minWidth: 64,
    },
    padding: theme.spacing(0),
    textTransform: 'none',
  },
}));

function HeaderNavMenu({ links }) {
  const classes = useStyles();
  const location = useLocation();
  let currentTab = false;
  Object.entries(links).map(([title, link]) => {
    if (location.pathname.startsWith(link)) {
      currentTab = title;
    }
  });

  return (
    <Tabs
      aria-label="tabs"
      indicatorColor="secondary"
      scrollButtons="auto"
      value={currentTab}
      variant="scrollable">
      {Object.entries(links).map(([title, link]) => (
        <Tab
          className={classes.tab}
          component={Link}
          key={title}
          label={title}
          value={title}
          to={link}
        />
      ))}
    </Tabs>
  );
}

HeaderNavMenu.propTypes = {
  links: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default HeaderNavMenu;
