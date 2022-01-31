import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Drawer,
  Typography,
  useMediaQuery,
} from '@mui/material';
import FilterBar from '../components/FilterBar';
import FilterPanel from '../components/FilterPanel';
import ScholarshipList from '../components/ScholarshipList';
import useQueryParams from '../lib/useQueryParams';
import { DEADLINE_ASC, getDir, getField } from '../lib/sortOptions';
import Scholarships from '../models/Scholarships';

function ListScholarships() {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const drawerWidth = isDesktop ? 360 : '100%';

  const [{ minAmount, maxAmount, grades, majors, sortBy }] = useQueryParams();

  const sortField = getField(sortBy ?? DEADLINE_ASC);
  const sortDir = getDir(sortBy ?? DEADLINE_ASC);

  const listScholarships = () =>
    Scholarships.list({
      sortField,
      sortDir,
      minAmount,
      maxAmount,
      grades,
      majors,
      hideExpired: true,
    });

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Helmet>
        <title>{t('listScholarships.titleTag')}</title>
      </Helmet>
      <Drawer
        sx={{
          flexShrink: 0,
          width: drawerWidth,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            position: 'absolute',
            boxSizing: 'border-box',
          },
          position: isDesktop ? 'sticky' : 'static',
          overflowY: 'auto',
        }}
        open={drawerOpen || isDesktop}
        variant={isDesktop ? 'permanent' : 'temporary'}
        anchor="left">
        <FilterPanel closePanel={() => setDrawerOpen(false)} />
      </Drawer>

      <Container
        maxWidth="md"
        component="main"
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
        <FilterBar openFilter={() => setDrawerOpen(true)} />
        <ScholarshipList listFn={listScholarships} />
      </Container>
    </Box>
  );
}

export default ListScholarships;
