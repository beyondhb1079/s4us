import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { Container, Typography } from '@material-ui/core';
import Scholarships from '../models/Scholarships';
import ScholarshipList from '../components/ScholarshipList';
import FilterBar from '../components/FilterBar';
import qParams from '../lib/QueryParams';
import sortOptions, {
  DEADLINE_ASC,
  getDir,
  getField,
} from '../lib/sortOptions';

function ListScholarships() {
  const history = useHistory();
  const location = useLocation();

  const params = queryString.parse(location.search, { parseNumbers: true });

  const setQueryParam = (index, val) => {
    history.push({
      search: queryString.stringify({
        ...params,
        [index]: val,
      }),
    });
  };

  const pruneQueryParam = (index) => {
    delete params[index];
    history.replace({ search: queryString.stringify(params) });
  };

  if (params.sortBy && !(params.sortBy in sortOptions)) {
    pruneQueryParam('sortBy');
  }

  const sortBy = params.sortBy ?? DEADLINE_ASC;

  const sortField = getField(sortBy);
  const sortDir = getDir(sortBy);

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
      <Helmet>
        <title>Search Scholarships</title>
      </Helmet>
      <Typography variant="h3" component="h1" style={{ textAlign: 'center' }}>
        Scholarships
      </Typography>
      <FilterBar queryParams={params} {...{ setQueryParam }} />
      <ScholarshipList listFn={listScholarships} />
    </Container>
  );
}

export default ListScholarships;
