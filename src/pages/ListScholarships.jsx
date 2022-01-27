import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { Box, Container, Drawer, Hidden, Typography } from '@mui/material';
import Scholarships from '../models/Scholarships';
import ScholarshipList from '../components/ScholarshipList';
import FilterBar from '../components/FilterBar';
import FilterPanel from '../components/FilterPanel';
import qParams from '../lib/QueryParams';
import sortOptions, {
  DEADLINE_ASC,
  getDir,
  getField,
} from '../lib/sortOptions';
import GradeLevel from '../types/GradeLevel';
import { useTranslation } from 'react-i18next';

const queryOptions = {
  arrayFormat: 'bracket-separator',
  arrayFormatSeparator: ',',
};

const drawerWidth = 360;

function ListScholarships() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const params = queryString.parse(location.search, {
    parseNumbers: true,
    ...queryOptions,
  });

  const setQueryParam = (index, val) => {
    navigate({
      search: queryString.stringify(
        {
          ...params,
          [index]: val,
        },
        queryOptions
      ),
    });
  };

  const pruneQueryParam = (index) => {
    delete params[index];
    navigate(
      {
        search: queryString.stringify(params, queryOptions),
      },
      {
        replace: true,
      }
    );
  };

  /**
   * when dealing with invalid values in an array
   * rather than pruning the entire param, we can prune out the invalid values
   */
  const replaceQueryParam = (key, newVal) => {
    params[key] = newVal;
    navigate(
      { search: queryString.stringify(params, queryOptions) },
      {
        replace: true,
      }
    );
  };

  if (params.sortBy && !(params.sortBy in sortOptions)) {
    pruneQueryParam('sortBy');
  }

  const sortBy = params.sortBy ?? DEADLINE_ASC;

  const sortField = getField(sortBy);
  const sortDir = getDir(sortBy);

  const { minAmount, maxAmount, grades, majors } = params;

  if (
    minAmount !== undefined &&
    !(Number.isInteger(minAmount) && minAmount > 0)
  ) {
    pruneQueryParam(qParams.MIN_AMOUNT);
  }

  if (
    maxAmount !== undefined &&
    !(Number.isInteger(maxAmount) && maxAmount > 0)
  ) {
    pruneQueryParam(qParams.MAX_AMOUNT);
  }

  /**
   * prunes invalid grade values not respresented by GradeLevel enum
   */
  if (grades !== undefined) {
    if (Array.isArray(grades) && grades.length > 0) {
      const prunedInvalid = [...new Set(grades)].filter((g) =>
        GradeLevel.keys().includes(g)
      );

      if (prunedInvalid.length !== grades.length) {
        replaceQueryParam(qParams.GRADES, prunedInvalid);
      }
    } else pruneQueryParam(qParams.GRADES);
  }

  if (majors !== undefined) {
    if (!Array.isArray(majors) || majors.length === 0 || majors[0] === '')
      pruneQueryParam(qParams.MAJORS);
  }

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
    <Box sx={{ display: 'flex', position: 'relative', height: '100%' }}>
      <Helmet>
        <title>{t('listScholarships.titleTag')}</title>
      </Helmet>
      <Hidden mdDown>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              position: 'absolute',
              height: '100%',
              width: '100%',
            },
            position: 'sticky',
            overflowY: 'auto',
          }}
          variant="permanent"
          anchor="left">
          <FilterPanel queryParams={params} {...{ setQueryParam }} />
        </Drawer>
      </Hidden>
      <Container
        maxWidth="md"
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 2 }}>
        <Typography variant="h4" component="h1" align="center" style={{ p: 1 }}>
          {t('general.scholarships')}
        </Typography>
        <FilterBar queryParams={params} {...{ setQueryParam }} />
        <ScholarshipList listFn={listScholarships} />
      </Container>
    </Box>
  );
}

export default ListScholarships;
