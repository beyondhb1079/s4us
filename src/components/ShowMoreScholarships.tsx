import { useContext, useEffect } from 'react';
import { Stack, Button, Paper } from '@mui/material';
import ScholarshipsContext from '../models/ScholarshipsContext';
import ScholarshipCard from './ScholarshipCard';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ShowMoreScholarships({
  currentId,
}: {
  currentId: number;
}): JSX.Element {
  const { scholarships, loading, setFilters } = useContext(ScholarshipsContext);
  const { t } = useTranslation('common');

  useEffect(() => {
    if (scholarships.length === 0 && !loading) {
      setFilters({ showExpired: true });
    }
  }, [scholarships, loading, setFilters]);

  return (
    <Stack direction="row" spacing={2}>
      {scholarships
        .filter((s) => Number.parseInt(s.id) !== currentId)
        .slice(0, 4)
        .map(({ id, data }) => (
          <ScholarshipCard key={id} scholarship={{ id, data }} style="glance" />
        ))}
      <Paper
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          textAlign: 'center',
          justifyContent: 'center',
        }}>
        <Button
          size="large"
          component={Link}
          sx={{ paddingX: 5 }}
          to="/scholarships">
          {t('actions.browseScholarships')}
        </Button>
      </Paper>
    </Stack>
  );
}
