import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Collapse,
  Container,
  Drawer,
  Toolbar,
  useMediaQuery,
  useScrollTrigger,
  Chip,
} from '@mui/material';
import FilterBar from '../components/FilterBar';
import FilterPanel from '../components/FilterPanel';
import ScholarshipList from '../components/ScholarshipList';
import useQueryParams from '../lib/useQueryParams';
import { DEADLINE_ASC, getDir, getField } from '../lib/sortOptions';
import { HeaderSkeleton } from '../components/Header';

const drawerWidth = 360;

function ListScholarships() {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const [{ minAmount, maxAmount, grades, majors, sortBy }, setQueryParams] =
    useQueryParams();
  const [majorParams, setMajorParams] = useState(majors);

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

  const scrollTrigger = useScrollTrigger();

  function deleteOnClick(m) {
    const updatedMajors = majorParams.filter((major) => major != m);
    setQueryParams({
      majors: updatedMajors,
    });
    setMajorParams(updatedMajors);
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Helmet>
        <title>{t('listScholarships.titleTag')}</title>
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
          <FilterPanel
            onClose={() => setDrawerOpen(false)}
            majors={majorParams}
            setMajors={setMajorParams}
          />
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
        <Toolbar />

        <Container maxWidth="md" sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              overflowX: 'scroll',
              whiteSpace: 'nowrap',
              scrollbarWidth: 'none',
            }}>
            {majors?.map((m) => (
              <Chip
                key={m}
                label={m}
                color="primary"
                onClick={() => deleteOnClick(m)}
                onDelete={() => deleteOnClick(m)}
                sx={{ mr: 2, mt: 3 }}
              />
            ))}
          </Box>
          <ScholarshipList filters={queryFilters} />
        </Container>
      </Box>
    </Box>
  );
}

export default ListScholarships;
