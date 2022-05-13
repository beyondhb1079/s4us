import React, { useContext, useEffect, useRef } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ScholarshipCard from './ScholarshipCard';
import { DEADLINE_ASC, getDir, getField } from '../lib/sortOptions';
import ScholarshipsContext from '../models/ScholarshipsContext';
import useOnScreen from '../lib/useOnScreen';
import useQueryParams from '../lib/useQueryParams';

export default function ScholarshipList({ noResultsNode, extraFilters }) {
  const { canLoadMore, error, loading, loadMore, scholarships, setFilters } =
    useContext(ScholarshipsContext);
  const { t } = useTranslation('listScholarships');
  const [queryParams] = useQueryParams();

  // Resets result context if filters change.
  useEffect(() => {
    const { minAmount, grades, majors, sortBy } = queryParams;
    const sortField = getField(sortBy ?? DEADLINE_ASC);
    const sortDir = getDir(sortBy ?? DEADLINE_ASC);
    setFilters({
      sortField,
      sortDir,
      minAmount,
      grades,
      majors,
      ...extraFilters,
    });
  }, [queryParams, extraFilters, setFilters]);

  // Automatically load more when the progress is visible
  const progressRef = useRef(null);
  const progressVisible = useOnScreen(progressRef);

  // Resets result context if filters change.
  useEffect(() => {
    if (progressVisible && canLoadMore && !loading) {
      loadMore();
    }
  }, [loading, canLoadMore, loadMore, progressVisible]);

  return (
    <Stack spacing={3} paddingY={3}>
      {scholarships.map(({ id, data }) => (
        <ScholarshipCard key={id} scholarship={{ id, data }} style="result" />
      ))}
      <Box sx={{ margin: 'auto', textAlign: 'center' }}>
        {error && <Typography>{error.toString()}</Typography>}
        <CircularProgress
          data-testid="progress"
          ref={progressRef}
          sx={{
            display: loading || canLoadMore ? 'block' : 'none',
            margin: 'auto',
          }}
        />

        {!canLoadMore &&
          (scholarships?.length ? (
            <Typography>{t('endOfResults')}</Typography>
          ) : (
            noResultsNode || <Typography>{t('noScholarshipsFound')}</Typography>
          ))}
      </Box>
    </Stack>
  );
}

ScholarshipList.propTypes = {
  /** Additional filters to set apart from ones parseable from the query string. */
  extraFilters: PropTypes.object,
  noResultsNode: PropTypes.node,
};
ScholarshipList.defaultProps = {
  extraFilters: {},
  noResultsNode: undefined,
};
