import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Box, Container, Drawer, Typography } from '@mui/material';
import FilterBar from '../components/FilterBar';
import FilterPanel from '../components/FilterPanel';
import ScholarshipList from '../components/ScholarshipList';
import useQueryParams from '../lib/useQueryParams';
import { DEADLINE_ASC, getDir, getField } from '../lib/sortOptions';
import { useNavigationType } from 'react-router-dom';

const drawerWidth = 360;

const SCROLL_KEY = 'scholarship-list-scroll-top';

function ListScholarships() {
  const { t } = useTranslation();

  const [{ minAmount, maxAmount, grades, majors, sortBy }] = useQueryParams();

  const sortField = getField(sortBy ?? DEADLINE_ASC);
  const sortDir = getDir(sortBy ?? DEADLINE_ASC);

  const queryFilters = {
    sortField,
    sortDir,
    minAmount,
    maxAmount,
    grades,
    majors,
    hideExpired: true,
  };

  const ref = useRef('main');
  const navigationType = useNavigationType();

  // This runs when the main component is first rendered.
  useEffect(() => {
    // Restore the saved scroll position if we went backwards/forwards in history.
    if (navigationType === 'POP') {
      ref.current.scrollTop = localStorage.getItem(SCROLL_KEY);
    }

    // Listen for scroll events, saving scroll position for later.
    ref.current.addEventListener(
      'scroll',
      () => localStorage.setItem(SCROLL_KEY, ref.current.scrollTop),
      { passive: true }
    );
  }, [ref, navigationType]);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Helmet>
        <title>{t('listScholarships.titleTag')}</title>
      </Helmet>
      <Drawer
        sx={{
          display: { xs: 'none', md: 'block' },
          flexShrink: 0,
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            position: 'absolute',
            boxSizing: 'border-box',
          },
          position: 'sticky',
          overflowY: 'auto',
        }}
        variant="permanent"
        anchor="left">
        <FilterPanel />
      </Drawer>
      <Container
        maxWidth="md"
        component="main"
        ref={ref}
        sx={{
          bgcolor: 'background.default',
          flexGrow: 1,
          padding: 2,
          position: 'sticky',
          overflowY: { md: 'auto' },
        }}>
        <Typography variant="h4" component="h1" align="center" style={{ p: 1 }}>
          {t('general.scholarships')}
        </Typography>
        <FilterBar />
        <ScholarshipList filters={queryFilters} />
      </Container>
    </Box>
  );
}

export default ListScholarships;
