import React, { useContext, useEffect, useRef } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ScholarshipCard from './ScholarshipCard';
import { DEADLINE_ASC, getDir, getField } from '../lib/sortOptions';
import ScholarshipsContext from '../models/ScholarshipsContext';
import { FilterOptions } from '../models/Scholarships';
import useOnScreen from '../lib/useOnScreen';
import useQueryParams from '../lib/useQueryParams';

interface SLProps {
  noResultsNode?: JSX.Element;
  extraFilters?: Partial<FilterOptions>;
}

export default function ScholarshipList({
  noResultsNode,
  extraFilters = {},
}: SLProps): JSX.Element {
  const { canLoadMore, error, loading, loadMore, scholarships, setFilters } =
    useContext(ScholarshipsContext);
  const { t } = useTranslation('listScholarships');
  const [queryParams] = useQueryParams();

  // Resets result context if filters change.
  useEffect(() => {
    const {
      minAmount,
      grades,
      majors,
      states,
      schools,
      ethnicities,
      showExpired,
      sortBy,
    } = queryParams;
    const sortField = getField(sortBy ?? DEADLINE_ASC);
    const sortDir = getDir(sortBy ?? DEADLINE_ASC);
    setFilters({
      sortField,
      sortDir,
      minAmount,
      grades,
      majors,
      states,
      schools,
      ethnicities,
      showExpired,
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
