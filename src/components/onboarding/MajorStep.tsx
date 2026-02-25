import React from 'react';
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  CircularProgress,
} from '@mui/material';
import { useFormikContext } from 'formik';
import useOptionsData from '../../lib/useOptionsData';

export default function MajorStep() {
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
        What is your intended field of study?
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Search for your intended major or career path. You can select multiple
        fields.
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
            label="Select Majors/Fields"
            placeholder="Computer Science, Nursing, etc."
          />
        )}
      />
    </Box>
  );
}
