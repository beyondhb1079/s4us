import React, { Suspense, useEffect, useState } from 'react';
import useDocumentTitle from '../lib/useDocumentTitle';
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
  Stack,
  Theme,
  Tabs,
  Tab,
} from '@mui/material';
import FilterBar from '../components/filters/FilterBar';
import FilterPanel from '../components/filters/FilterPanel';
import ScholarshipList from '../components/scholarship/ScholarshipList';
import useQueryParams from '../lib/useQueryParams';
import { HeaderSkeleton } from '../components/layout/Header';
import GradeLevel, { GradeLevelInfo } from '../types/GradeLevel';
import State from '../types/States';
import { useLocation } from 'react-router-dom';
import { logEventAsync } from '../lib/analytics';
import Ethnicity, { EthnicityInfo } from '../types/Ethnicity';
import useAuth from '../lib/useAuth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { FilterOptions } from '../models/Scholarships';

const drawerWidth = 360;

function ListScholarships(): React.ReactElement {
  const { t } = useTranslation('listScholarships');
  useDocumentTitle(t('titleTag'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [userPreferences, setUserPreferences] =
    useState<Partial<FilterOptions> | null>(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const db = getFirestore();
      getDoc(doc(db, 'users', currentUser.uid))
        .then((docSnap) => {
          if (docSnap.exists() && docSnap.data().preferences) {
            setUserPreferences(docSnap.data().preferences);
          }
        })
        .catch(console.error);
    } else {
      setUserPreferences(null);
      setActiveTab(0);
    }
  }, [currentUser]);

  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const [
    { minAmount, grades, majors, states, schools, ethnicities },
    setQueryParams,
  ] = useQueryParams();

  const filterChips = {} as Record<
    string,
    { [k: string]: undefined | string[] | number[] }
  >;

  if (Number.isInteger(minAmount)) {
    filterChips[`Min $${minAmount}`] = { minAmount: undefined };
  }

  const addFilterChips = <T,>(
    items: unknown,
    categoryKey: string,
    formatter: (item: T) => string = String,
  ) => {
    if (!Array.isArray(items)) return;

    const arr = items as T[];
    arr.forEach((item) => {
      filterChips[formatter(item)] = {
        [categoryKey]: arr.filter((i) => i !== item) as string[] | number[],
      };
    });
  };

  addFilterChips<string>(majors, 'majors');
  addFilterChips<GradeLevel>(grades, 'grades', GradeLevelInfo.toString);
  addFilterChips<string>(states, 'states', State.toString);
  addFilterChips<string>(schools, 'schools');
  addFilterChips<Ethnicity>(ethnicities, 'ethnicities', EthnicityInfo.toString);

  const scrollTrigger = useScrollTrigger();

  const location = useLocation();
  useEffect(() => {
    logEventAsync('search', {
      search_term: location.search,
    });
  }, [location]);

  return (
    <Box sx={{ display: 'flex' }}>
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
        <Toolbar />

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

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs
              value={activeTab}
              onChange={(e, v) => setActiveTab(v)}
              aria-label="scholarship-feed-tabs">
              <Tab label="Search All" />
              <Tab label="For You" disabled={!currentUser} />
            </Tabs>
          </Box>

          <Suspense fallback={null}>
            <ScholarshipList
              userPreferences={activeTab === 1 ? userPreferences : null}
            />
          </Suspense>
        </Container>
      </Box>
    </Box>
  );
}

export default ListScholarships;
