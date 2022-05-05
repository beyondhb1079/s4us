import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';
import { useTranslation } from 'react-i18next';

function HeaderNavMenu({ links }) {
  const location = useLocation();
  let currentTab = false;
  const { t } = useTranslation('common');

  Object.entries(links).forEach(([title, link]) => {
    if (location.pathname.startsWith(link)) {
      currentTab = title;
    }
  });

  return (
    <Tabs
      aria-label="tabs"
      indicatorColor="primary"
      scrollButtons="auto"
      value={currentTab}
      variant="scrollable"
      sx={{ display: 'inline-flex' }}>
      {Object.entries(links).map(([title, link]) => (
        <Tab
          sx={{
            minWidth: { xs: 64, md: 72 },
            marginRight: 0,
            padding: 0,
            textTransform: 'none',
          }}
          component={Link}
          key={title}
          label={t(title)}
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
