import React from 'react';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { STATES } from '../../types/States';

export default function StateStep() {
  const { t } = useTranslation('onboarding');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { values, setFieldValue } = useFormikContext<any>();
  const currentStates: string[] = values.states || [];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('stateStep.title')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('stateStep.description')}
      </Typography>

      <Autocomplete
        multiple
        id="states-tags"
        options={STATES}
        getOptionLabel={(option) => option.name}
        value={STATES.filter((s) => currentStates.includes(s.abbr))}
        onChange={(event, newValue) => {
          setFieldValue(
            'states',
            newValue.map((v) => v.abbr),
          );
        }}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            variant="outlined"
            label={t('stateStep.labels.selectStates')}
            placeholder={t('stateStep.labels.placeholder')}
          />
        )}
      />
    </Box>
  );
}
