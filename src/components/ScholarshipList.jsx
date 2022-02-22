import React, { useContext, useEffect, useRef } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ScholarshipCard from './ScholarshipCard';
import ScholarshipsContext from '../models/ScholarshipsContext';
import useOnScreen from '../lib/useOnScreen';

export default function ScholarshipList({ noResultsNode, filters }) {
  const { canLoadMore, error, loading, loadMore, scholarships, setFilters } =
    useContext(ScholarshipsContext);
  const { t } = useTranslation();

  // Resets result context if filters change.
  useEffect(() => setFilters(filters), [filters, setFilters]);

  // Automatically load more when the progress is visible
  const progressRef = useRef(null);
  const progressVisible = useOnScreen(progressRef);

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
            <Typography>{t('listScholarships.endOfResults')}</Typography>
          ) : (
            noResultsNode || (
              <Typography>
                {t('listScholarships.noScholarshipsFound')}
              </Typography>
            )
          ))}
      </Box>
    </Stack>
  );
}

ScholarshipList.propTypes = {
  filters: PropTypes.object,
  noResultsNode: PropTypes.node,
};
ScholarshipList.defaultProps = {
  filters: {},
  noResultsNode: undefined,
};
