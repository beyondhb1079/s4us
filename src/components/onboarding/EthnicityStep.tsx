import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

export default function EthnicityStep() {
  const { t } = useTranslation('onboarding');

  const ETHNICITY_OPTIONS = [
    {
      value: 'AMERICAN_INDIAN_OR_ALASKA_NATIVE',
      label: t('ethnicityStep.ethnicities.AMERICAN_INDIAN_OR_ALASKA_NATIVE'),
    },
    { value: 'ASIAN', label: t('ethnicityStep.ethnicities.ASIAN') },
    {
      value: 'BLACK_OR_AFRICAN_AMERICAN',
      label: t('ethnicityStep.ethnicities.BLACK_OR_AFRICAN_AMERICAN'),
    },
    {
      value: 'HISPANIC_OR_LATINO',
      label: t('ethnicityStep.ethnicities.HISPANIC_OR_LATINO'),
    },
    {
      value: 'NATIVE_HAWAIIAN_OR_OTHER_PACIFIC_ISLANDER',
      label: t(
        'ethnicityStep.ethnicities.NATIVE_HAWAIIAN_OR_OTHER_PACIFIC_ISLANDER',
      ),
    },
    { value: 'WHITE', label: t('ethnicityStep.ethnicities.WHITE') },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { values, setFieldValue } = useFormikContext<any>();
  const currentEthnicities: string[] = values.ethnicities || [];

  const handleToggle = (ethnicityValue: string) => {
    if (currentEthnicities.includes(ethnicityValue)) {
      setFieldValue(
        'ethnicities',
        currentEthnicities.filter((e) => e !== ethnicityValue),
      );
    } else {
      setFieldValue('ethnicities', [...currentEthnicities, ethnicityValue]);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('ethnicityStep.title')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('ethnicityStep.description')}
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {ETHNICITY_OPTIONS.map((eth) => (
          <Chip
            key={eth.value}
            label={eth.label}
            onClick={() => handleToggle(eth.value)}
            color={
              currentEthnicities.includes(eth.value) ? 'primary' : 'default'
            }
            variant={
              currentEthnicities.includes(eth.value) ? 'filled' : 'outlined'
            }
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>
    </Box>
  );
}
