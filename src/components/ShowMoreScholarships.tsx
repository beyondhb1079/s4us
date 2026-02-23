import { Stack, Button, Paper } from '@mui/material';
import ScholarshipCard from './ScholarshipCard';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useScholarshipsQuery } from '../hooks/useScholarshipsQuery';

export default function ShowMoreScholarships({
  currentId,
}: {
  currentId: number;
}): React.JSX.Element {
  const { t } = useTranslation('common');
  const { data } = useScholarshipsQuery({ showExpired: true });
  const scholarships = data?.pages.flatMap((page) => page.results) ?? [];

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
