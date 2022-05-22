import React, { useState } from 'react';
import { getIn } from 'formik';
import {
  Autocomplete,
  createFilterOptions,
  InputLabel,
  SxProps,
  TextField,
  Theme,
} from '@mui/material';

const filterOptions = createFilterOptions({
  stringify: (option: string) =>
    `${option.replace(/\([A-Z]+\)/, '').replaceAll(/[^A-Z]/g, '')} ${option}`,
});

interface FAProps {
  label?: string;
  id: string;
  labelStyle?: SxProps<Theme>;
  /** The result of `useFormik()`. */
  formik: any;
  placeholder?: string;
  onChange?: (v: string[]) => void;
}

/* eslint-disable react/jsx-props-no-spreading */
export default function FormikAutocomplete(props: FAProps): JSX.Element {
  const {
    label,
    id,
    labelStyle,
    formik,
    placeholder,
    onChange,
    ...otherProps
  } = props;
  const values = getIn(formik.values, id, []);

  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <InputLabel sx={labelStyle}>{label ?? ''}</InputLabel>
      <Autocomplete
        id={id}
        multiple
        filterOptions={filterOptions}
        options={values}
        value={values}
        inputValue={inputValue}
        onChange={(e, val) =>
          onChange ? onChange(val) : formik.setFieldValue(id, val)
        }
        onInputChange={(event, newInputValue) => {
          const options = newInputValue.split(',');

          if (options.length > 1) {
            const vals = values.concat(
              options.map((x) => x.trim()).filter((x) => x)
            );
            setInputValue('');
            return onChange ? onChange(vals) : formik.setFieldValue(id, vals);
          } else {
            setInputValue(newInputValue);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
            placeholder={values.length > 0 ? '' : placeholder}
          />
        )}
        {...otherProps}
      />
    </>
  );
}
