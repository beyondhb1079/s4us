import React from 'react';
import { InputLabel, SxProps, TextField, Theme } from '@mui/material';
import { getIn } from 'formik';

interface FTFProps {
  /** The result of `useFormik()`. */
  formik: any;
  id: string;
  label: string;

  minRows?: number;
  labelStyle?: SxProps<Theme>;
  value?: string | number;
}

/* eslint-disable react/jsx-props-no-spreading */
export default function FormikTextField(props: FTFProps): JSX.Element {
  const {
    label,
    labelStyle,
    id,
    formik,
    minRows = 0,
    value,
    ...otherProps
  } = props;

  return (
    <>
      <InputLabel sx={labelStyle}>{label}</InputLabel>
      <TextField
        id={id}
        error={Boolean(getIn(formik.errors, id))}
        helperText={getIn(formik.errors, id)}
        value={getIn(formik.values, id) || ''}
        onChange={formik.handleChange}
        fullWidth
        multiline={minRows > 0}
        minRows={minRows}
        {...otherProps}
      />
    </>
  );
}
