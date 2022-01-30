import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Box, Container, Drawer, Typography } from '@mui/material';
import FilterBar from '../components/FilterBar';
import FilterPanel from '../components/FilterPanel';
import ScholarshipList from '../components/ScholarshipList';
import useQueryParams from '../lib/useQueryParams';
import { DEADLINE_ASC, getDir, getField } from '../lib/sortOptions';

const drawerWidth = 360;

function ListScholarships() {
  const { t } = useTranslation();

  const [{ minAmount, maxAmount, grades, majors, sortBy }] = useQueryParams();

  const sortField = getField(sortBy ?? DEADLINE_ASC);
  const sortDir = getDir(sortBy ?? DEADLINE_ASC);

  const filterOptions = {
    sortField,
    sortDir,
    minAmount,
    maxAmount,
    grades,
    majors,
    hideExpired: true,
  };

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
        <ScholarshipList filterOptions={filterOptions} />
      </Container>
    </Box>
  );
}

export default ListScholarships;
