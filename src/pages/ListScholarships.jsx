import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Drawer, Typography } from '@mui/material';
import FilterBar from '../components/FilterBar';
import FilterPanel from '../components/FilterPanel';
import ScholarshipCard from '../components/ScholarshipCard';
import ScholarshipList from '../components/ScholarshipList';
import { useQueryParams } from '../lib/QueryParams';
import { DEADLINE_ASC, getDir, getField } from '../lib/sortOptions';
import Scholarships from '../models/Scholarships';

const drawerWidth = 360;

const FilteredScholarshipList = () => {
  const navigate = useNavigate();
  const [{ minAmount, maxAmount, grades, majors, sortBy }] = useQueryParams();
  const sortField = getField(sortBy ?? DEADLINE_ASC);
  const sortDir = getDir(sortBy ?? DEADLINE_ASC);

  const scholarshipList = useMemo(
    () => (
      <ScholarshipList
        listFn={() =>
          Scholarships.list({
            sortField,
            sortDir,
            minAmount,
            maxAmount,
            grades,
            majors,
            hideExpired: true,
          })
        }
        onItemSelect={(s) =>
          navigate('', {
            state:
              s === undefined
                ? {}
                : {
                    scholarship: { id: s.id, data: s.data },
                  },
          })
        }
      />
    ),
    [navigate, sortField, sortDir, minAmount, maxAmount, grades, majors]
  );
  return scholarshipList;
};

function ListScholarships() {
  const location = useLocation();
  const { t } = useTranslation();

  // Parse selected scholarship
  // Note: to avoid overcomplicating things we don't keep track of this in the URL.
  // Users can share a specific scholarship instead.
  const selected = location.state?.scholarship;

  const scholarshipList = useMemo(() => <FilteredScholarshipList />, []);

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
