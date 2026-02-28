import React, { useEffect, useRef } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ScholarshipCard from './ScholarshipCard';
import { DEADLINE_ASC, getDir, getField } from '../../lib/sortOptions';
import { FilterOptions } from '../../models/Scholarships';
import useOnScreen from '../../lib/useOnScreen';
import useQueryParams from '../../lib/useQueryParams';
import { useScholarshipsQuery } from '../../hooks/useScholarshipsQuery';

interface SLProps {
  noResultsNode?: React.JSX.Element;
  extraFilters?: Partial<FilterOptions>;
  userPreferences?: Partial<FilterOptions> | null;
}

export default function ScholarshipList({
  noResultsNode,
  extraFilters = {},
  userPreferences = null,
}: SLProps): React.JSX.Element {
  const { t } = useTranslation('listScholarships');
  const [queryParams] = useQueryParams();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useScholarshipsQuery({
    sortField: getField((queryParams.sortBy as string) ?? DEADLINE_ASC),
    sortDir: getDir((queryParams.sortBy as string) ?? DEADLINE_ASC) as
      | 'asc'
      | 'desc',
    ...(queryParams as unknown as FilterOptions),
    ...(userPreferences || {}),
    ...extraFilters,
  });

  const scholarships = data?.pages.flatMap((page) => page.results) ?? [];
  const loading = isFetching || isFetchingNextPage;
  const canLoadMore = !!hasNextPage;

  // Automatically load more when the progress is visible
  const progressRef = useRef<HTMLElement>(null);
  const progressVisible = useOnScreen(
    progressRef as React.RefObject<HTMLElement>,
  );

  // Load next page
  useEffect(() => {
    if (progressVisible && canLoadMore && !loading) {
      fetchNextPage();
    }
  }, [loading, canLoadMore, fetchNextPage, progressVisible]);

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
