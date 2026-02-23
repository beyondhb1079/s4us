import { FormikConfig, FormikValues } from 'formik';
import React from 'react';
import {
  BaseTextFieldProps,
  InputLabel,
  SxProps,
  TextField,
  Theme,
} from '@mui/material';
import { getIn } from 'formik';

interface FTFProps extends BaseTextFieldProps {
  /** The result of `useFormik()`. */
  formik: Partial<FormikConfig<FormikValues>>;
  id: string;
  label: string;

  labelStyle?: SxProps<Theme>;
}

/* eslint-disable react/jsx-props-no-spreading */
export default function FormikTextField(props: FTFProps): JSX.Element {
  const { label, labelStyle, id, formik, minRows = 0, ...otherProps } = props;

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
        multiline={Number(minRows) > 0}
        minRows={minRows}
        {...otherProps}
      />
    </>
  );
}
