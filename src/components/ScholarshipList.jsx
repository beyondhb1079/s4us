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

export default function ScholarshipList({ noResultsNode, filters }) {
  const { canLoadMore, error, loading, loadMore, scholarships, setFilters } =
    useContext(ScholarshipsContext);

  // Resets result context if listFn changes.
  useEffect(() => setFilters(filters), [filters, setFilters]);

  const { t } = useTranslation();
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
  filters: PropTypes.object,
  noResultsNode: PropTypes.node,
};
ScholarshipList.defaultProps = {
  filters: {},
  noResultsNode: undefined,
};
