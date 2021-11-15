import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { Container, Typography } from '@mui/material';
import Scholarships from '../models/Scholarships';
import ScholarshipList from '../components/ScholarshipList';
import FilterBar from '../components/FilterBar';
import qParams from '../lib/QueryParams';
import sortOptions, {
  DEADLINE_ASC,
  getDir,
  getField,
} from '../lib/sortOptions';
import GradeLevel from '../types/GradeLevel';

const queryOptions = {
  arrayFormat: 'bracket-separator',
  arrayFormatSeparator: ',',
};

function ListScholarships() {
  const history = useHistory();
  const location = useLocation();

  const params = queryString.parse(location.search, {
    parseNumbers: true,
    ...queryOptions,
  });

  const setQueryParam = (index, val) => {
    history.push({
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
    history.replace({ search: queryString.stringify(params) });
  };

  /**
   * when dealing with invalid values in an array
   * rather than pruning the entire param, we can prune out the invalid values
   */
  const replaceQueryParam = (index, newVal) => {
    params.grades = newVal;
    history.replace({ search: queryString.stringify(params, queryOptions) });
  };

  if (params.sortBy && !(params.sortBy in sortOptions)) {
    pruneQueryParam('sortBy');
  }

  const sortBy = params.sortBy ?? DEADLINE_ASC;

  const sortField = getField(sortBy);
  const sortDir = getDir(sortBy);

  const { minAmount, maxAmount, grades } = params;
  console.log(grades);

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
  if (
    grades !== undefined &&
    Array.isArray(grades) &&
    JSON.stringify(grades) !== '[]'
  ) {
    const prunedInvalid = grades.filter((g) => GradeLevel.keys().includes(g));
    if (prunedInvalid.length !== grades.length) {
      replaceQueryParam(qParams.GRADES, prunedInvalid);
    }
  }

  const listScholarships = () =>
    Scholarships.list({
      sortField,
      sortDir,
      minAmount,
      maxAmount,
      hideExpired: true,
    });

  return (
    <Container>
      <Helmet>
        <title>Search Scholarships</title>
      </Helmet>
      <Typography variant="h3" component="h1" align="center">
        Scholarships
      </Typography>
      <FilterBar queryParams={params} {...{ setQueryParam }} />
      <ScholarshipList listFn={listScholarships} />
    </Container>
  );
}

export default ListScholarships;
