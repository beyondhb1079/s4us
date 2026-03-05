import React from 'react';
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  CircularProgress,
} from '@mui/material';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import useOptionsData from '../../lib/useOptionsData';

export default function MajorStep() {
  const { t } = useTranslation('onboarding');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { values, setFieldValue } = useFormikContext<any>();
  const { majors, loading } = useOptionsData();
  const currentMajors: string[] = values.majors || [];

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('majorStep.title')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('majorStep.description')}
      </Typography>

      <Autocomplete
        multiple
        id="majors-tags"
        options={majors}
        value={currentMajors}
        onChange={(event, newValue) => {
          setFieldValue('majors', newValue);
        }}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            variant="outlined"
            label={t('majorStep.labels.selectMajors')}
            placeholder={t('majorStep.labels.placeholder')}
          />
        )}
      />
    </Box>
  );
}
