import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { useFormikContext } from 'formik';

const ETHNICITIES = [
  {
    value: 'AMERICAN_INDIAN_OR_ALASKA_NATIVE',
    label: 'American Indian or Alaska Native',
  },
  { value: 'ASIAN', label: 'Asian' },
  { value: 'BLACK_OR_AFRICAN_AMERICAN', label: 'Black or African American' },
  { value: 'HISPANIC_OR_LATINO', label: 'Hispanic or Latino' },
  {
    value: 'NATIVE_HAWAIIAN_OR_OTHER_PACIFIC_ISLANDER',
    label: 'Native Hawaiian or Other Pacific Islander',
  },
  { value: 'WHITE', label: 'White / Caucasian' },
];

export default function EthnicityStep() {
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
        How do you identify?
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Many organizations specifically sponsor underrepresented minorities. You
        can optionally select all that apply.
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {ETHNICITIES.map((eth) => (
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
