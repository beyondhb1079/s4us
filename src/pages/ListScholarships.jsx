import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Container, Drawer, Typography } from '@mui/material';
import FilterBar from '../components/FilterBar';
import FilterPanel from '../components/FilterPanel';
import ScholarshipCard from '../components/ScholarshipCard';
import ScholarshipList from '../components/ScholarshipList';

const drawerWidth = 400;

function ListScholarships() {
  const location = useLocation();
  const { t } = useTranslation();

  // Parse selected scholarship
  // Note: to avoid overcomplicating things we don't keep track of this in the URL.
  // Users can share a specific scholarship instead.
  const selected = location.state?.scholarship;

  const navigate = useNavigate();
  useEffect(() => console.log('ListScholarships rerendered from scratch'), []);

  const onItemSelect = useCallback(
    (s) =>
      navigate('', {
        state: {
          scholarship: { id: s.id, data: s.data },
        },
      }),
    [navigate]
  );
  const [scholarshipList] = useState(
    <ScholarshipList onItemSelect={onItemSelect} />
  );
  useEffect(() => console.log('navigate changed'), [navigate]);

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
        {selected ? scholarshipList : <FilterPanel />}
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
        {selected ? (
          <ScholarshipCard scholarship={selected} style="detail" />
        ) : (
          <>
            <Button component={Link} to="" state={{}} sx={{ mb: 2 }}>
              Filters
            </Button>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              style={{ p: 1 }}>
              {t('general.scholarships')}
            </Typography>
            <FilterBar />
            {scholarshipList}
          </>
        )}
      </Container>
    </Box>
  );
}

export default ListScholarships;
