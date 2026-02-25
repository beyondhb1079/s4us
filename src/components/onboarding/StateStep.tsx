import React from 'react';
import { Box, Typography, Autocomplete, TextField } from '@mui/material';
import { useFormikContext } from 'formik';
import { STATES } from '../../types/States';

export default function StateStep() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { values, setFieldValue } = useFormikContext<any>();
  const currentStates: string[] = values.states || [];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Where do you live or plan to go to school?
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Many scholarships are restricted to residents or students of specific
        states.
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
            label="Select States"
            placeholder="States"
          />
        )}
      />
    </Box>
  );
}
