import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { Container, Typography } from '@material-ui/core';
import Scholarships from '../models/Scholarships';
import ScholarshipList from '../components/ScholarshipList';
import FilterBar from '../components/FilterBar';
import qParams from '../lib/QueryParams';

const sortOptions = {
  'deadline.asc': {
    field: 'deadline',
    dir: 'asc',
  },
  'deadline.desc': {
    field: 'deadline',
    dir: 'desc',
  },
  'amount.asc': {
    field: 'amount.min',
    dir: 'asc',
  },
  'amount.desc': {
    field: 'amount.max',
    dir: 'desc',
  },
};
const DEFAULT_SORT_BY = 'deadline.asc';

function ScholarshipsPage() {
  const history = useHistory();
  const location = useLocation();

  const params = queryString.parse(location.search, { parseNumbers: true });

  const setQueryParam = (index, val) => {
    // setScholarships([]); needed?
    history.push({
      search: queryString.stringify({
        ...params,
        [index]: val,
      }),
    });
  };

  const pruneQueryParam = (index) => {
    // setScholarships([]); needed?
    delete params[index];
    history.replace({ search: queryString.stringify(params) });
  };

  if (params.sortBy && !(params.sortBy in sortOptions)) {
    pruneQueryParam('sortBy');
  }

  const sortBy = params.sortBy ?? DEFAULT_SORT_BY;

  const sortField = sortOptions[sortBy].field;
  const sortDir = sortOptions[sortBy].dir;

  const { minAmount, maxAmount } = params;

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

  const listScholarships = () =>
    Scholarships.list({ sortField, sortDir, minAmount, maxAmount });

  return (
    <Container>
      <Typography variant="h3" component="h1" style={{ textAlign: 'center' }}>
        Scholarships
      </Typography>
      <FilterBar queryParams={params} {...{ setQueryParam }} />
      <ScholarshipList listFn={listScholarships} />
    </Container>
  );
}

export default ScholarshipsPage;
