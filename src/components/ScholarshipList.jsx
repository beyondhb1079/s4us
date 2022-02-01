import React, { useEffect, useContext } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ScholarshipCard from './ScholarshipCard';
import ScholarshipsContext from '../models/ScholarshipsContext';
import useQueryParams from '../lib/useQueryParams';

export default function ScholarshipList({
  noResultsNode,
  filters: extraFilters,
}) {
  const [queryParams] = useQueryParams();

  const { canLoadMore, error, loading, loadMore, scholarships, setFilters } =
    useContext(ScholarshipsContext);
  const { t } = useTranslation();

  // Resets result context if filters change.
  useEffect(() => {
    const { minAmount, maxAmount, grades, majors, sortBy } = queryParams;
    const sortField = getField(sortBy ?? DEADLINE_ASC);
    const sortDir = getDir(sortBy ?? DEADLINE_ASC);

    setFilters({
      sortField,
      sortDir,
      minAmount,
      maxAmount,
      grades,
      majors,
      ...extraFilters,
    });
  }, [queryParams, extraFilters, setFilters]);

  return (
    <Stack spacing={3}>
      {scholarships.map(({ id, data }) => (
        <ScholarshipCard key={id} scholarship={{ id, data }} style="result" />
      ))}
      <Box sx={{ margin: 'auto', textAlign: 'center' }}>
        {(() => {
          if (error) return <Typography>{error.toString()}</Typography>;
          if (loading)
            return (
              <CircularProgress
                data-testid="progress"
                sx={{ display: 'block', margin: 'auto' }}
              />
            );
          if (canLoadMore)
            return (
              <Button color="primary" onClick={loadMore}>
                {t('btn.loadMore')}
              </Button>
            );
          if (scholarships?.length)
            return (
              <Typography>{t('listScholarships.endOfResults')}</Typography>
            );
          return (
            noResultsNode || (
              <Typography>
                {t('listScholarships.noScholarshipsFound')}
              </Typography>
            )
          );
        })()}
      </Box>
    </Stack>
  );
}

ScholarshipList.propTypes = {
  /** Additional filters to set apart from ones parseable from the query string. */
  filters: PropTypes.object,
  noResultsNode: PropTypes.node,
};
ScholarshipList.defaultProps = {
  filters: {},
  noResultsNode: undefined,
};
