import { FormikConfig, FormikValues } from 'formik';
import React from 'react';
import { getIn } from 'formik';
import { InputLabel, Select, MenuItem, SxProps, Theme } from '@mui/material';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
      width: 250,
    },
  },
};

interface FMSProps {
  /** The result of `useFormik()`. */
  formik: Partial<FormikConfig<FormikValues>>;
  id: string;
  label: string;
  options: { [k: string]: string };

  disabled?: boolean;
  labelStyle?: SxProps<Theme>;
  placeholder?: string;
}

export default function FormikMultiSelect(props: FMSProps): JSX.Element {
  const {
    label,
    id,
    labelStyle,
    formik,
    options,
    disabled = false,
    placeholder = '',
  } = props;
  const values = getIn(formik.values, id, []);

  return (
    <>
      <InputLabel sx={labelStyle}>{label}</InputLabel>
      <Select
        sx={
          values.length > 0
            ? {}
            : {
                color: (theme) => theme.palette.grey[500],
                '& .Mui-disabled': {
                  WebkitTextFillColor: (theme) => theme.palette.grey[300],
                },
              }
        }
        disabled={disabled}
        multiple
        fullWidth
        displayEmpty
        id={id}
        variant="outlined"
        value={values}
        onChange={(e) => formik.setFieldValue(id, e.target.value)}
        renderValue={(selected) =>
          selected.map((val: string | number) => options[val]).join(', ') ||
          placeholder
        }
        MenuProps={MenuProps}>
        {Object.entries(options).map(([val, stringRep]) => (
          <MenuItem key={val} value={parseInt(val) || val}>
            {stringRep}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
