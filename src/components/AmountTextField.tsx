import React from 'react';
import { TextField, InputAdornment, TextFieldProps } from '@mui/material';

export default function AmountTextField(props: TextFieldProps): JSX.Element {
  return (
    <TextField
      variant="outlined"
      sx={{ maxWidth: 120 }}
      InputProps={{
        inputProps: { min: 0, max: 100000, step: 100 },
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}
