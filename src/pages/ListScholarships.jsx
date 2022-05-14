import React, { Suspense, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Collapse,
  Container,
  Drawer,
  useMediaQuery,
  useScrollTrigger,
  Chip,
  Stack,
} from '@mui/material';
import FilterBar from '../components/FilterBar';
import FilterPanel from '../components/FilterPanel';
import ScholarshipList from '../components/ScholarshipList';
import useQueryParams from '../lib/useQueryParams';
import { HeaderSkeleton } from '../components/Header';
import GradeLevel from '../types/GradeLevel';
import { useLocation } from 'react-router-dom';
import { getAnalytics, logEvent } from 'firebase/analytics';

const drawerWidth = 360;

function ListScholarships() {
  const { t } = useTranslation('listScholarships');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const [{ minAmount, grades, majors }, setQueryParams] = useQueryParams();

  const filterChips = {};
  if (Number.isInteger(minAmount)) {
    filterChips[`Min $${minAmount}`] = { minAmount: undefined };
  }

  majors?.forEach((m) => {
    filterChips[m] = {
      majors: majors?.filter((major) => major !== m),
    };
  });
  grades?.forEach((g) => {
    filterChips[GradeLevel.toString(g)] = {
      grades: grades?.filter((grade) => grade !== g),
    };
  });

  const scrollTrigger = useScrollTrigger();

  const location = useLocation();
  useEffect(() => {
    logEvent(getAnalytics(), 'search', { search_term: location.search });
  }, [location]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Helmet>
        <title>{t('titleTag')}</title>
      </Helmet>
      <Drawer
        sx={{
          flexShrink: 0,
          width: { xs: '100%', md: drawerWidth },
          '& .MuiDrawer-paper': {
            width: { xs: '100%', md: drawerWidth },
            boxSizing: 'border-box',
            overflowX: 'hidden',
            transition: 'height 100ms linear',
          },
        }}
        open={drawerOpen || isDesktop}
        variant={isDesktop ? 'permanent' : 'temporary'}
        anchor="left">
        <Collapse in={!scrollTrigger} sx={{ flexShrink: 0 }}>
          <HeaderSkeleton />
        </Collapse>
        <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
          <FilterPanel onClose={() => setDrawerOpen(false)} />
        </Box>
      </Drawer>

      <Box component="main" sx={{ width: '100%' }}>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
            zIndex: 1,
          }}>
          <Collapse in={!scrollTrigger} sx={{ flexShrink: 0 }}>
            <HeaderSkeleton />
          </Collapse>
          <FilterBar openFilter={() => setDrawerOpen(true)} />
        </Box>

        <Container maxWidth="md" sx={{ flexGrow: 1 }}>
          <Stack
            direction="row"
            rowGap={2}
            spacing={2}
            justifyContent={isDesktop ? 'center' : 'flex-start'}
            flexWrap={isDesktop ? 'wrap' : 'nowrap'}
            sx={{
              py: 1,
              mt: 2,
              overflowX: 'scroll',
              scrollbarWidth: 'none',
              backgroundImage:
                'linear-gradient(to right, #F8F9FA, #F8F9FA), linear-gradient(to right, #F8F9FA, #F8F9FA), linear-gradient(to right, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0)), linear-gradient(to left, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0))',
              backgroundPosition:
                'left center, right center, left center, right center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '20px 100%, 20px 100%, 10px 100%, 10px 100%',
              backgroundAttachment: 'local, local, scroll, scroll',
              '::-webkit-scrollbar': { display: 'none' },
            }}>
            {Object.entries(filterChips).map(([label, updatedQueryParams]) => (
              <Chip
                key={label}
                label={label}
                color="primary"
                onClick={() => setQueryParams(updatedQueryParams)}
              />
            ))}
          </Stack>
          <Suspense fallback={null}>
            <ScholarshipList extraFilters={{ hideExpired: true }} />
          </Suspense>
        </Container>
      </Box>
    </Box>
  );
}

export default ListScholarships;
