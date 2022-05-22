import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';

export default function HeaderNavMenu({
  links,
}: {
  links: Record<string, string>;
}): JSX.Element {
  const location = useLocation();
  let currentTab = false as string | boolean;

  Object.entries(links).forEach(([title, link]) => {
    if (location.pathname.startsWith(link)) {
      currentTab = title;
    }
  });

  return (
    <Tabs
      aria-label="primary pages tabs"
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
          label={title}
          value={title}
          to={link}
        />
      ))}
    </Tabs>
  );
}
