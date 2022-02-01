import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Box, Container, Drawer, Typography } from '@mui/material';
import FilterBar from '../components/FilterBar';
import FilterPanel from '../components/FilterPanel';
import ScholarshipList from '../components/ScholarshipList';

const drawerWidth = 360;

function ListScholarships() {
  const { t } = useTranslation();

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
        <ScholarshipList filters={{ hideExpired: true }} />
      </Container>
    </Box>
  );
}

export default ListScholarships;
