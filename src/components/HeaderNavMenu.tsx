import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tab, Tabs } from '@mui/material';

export default function HeaderNavMenu({
  links,
}: {
  links: Record<string, string>;
}): JSX.Element {
  const location = useLocation();
  const currentTab = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const match = Object.entries(links).find(([_, link]) =>
      location.pathname.startsWith(link),
    );
    return match ? match[0] : false;
  }, [links, location.pathname]);

  return (
    <Tabs
      aria-label="primary pages tabs"
      scrollButtons="auto"
      value={currentTab}
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
