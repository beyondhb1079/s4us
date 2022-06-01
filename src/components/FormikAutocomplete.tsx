import React, { useState } from 'react';
import { getIn } from 'formik';
import {
  Autocomplete,
  createFilterOptions,
  InputLabel,
  SxProps,
  TextField,
  Theme,
  UseAutocompleteProps,
} from '@mui/material';

const filterOptions = createFilterOptions({
  stringify: (option: string) =>
    `${option.replace(/\([A-Z]+\)/, '').replaceAll(/[^A-Z]/g, '')} ${option}`,
});

interface FAProps<FreeSolo extends boolean | undefined>
  extends UseAutocompleteProps<string, true, false, FreeSolo> {
  /** The result of `useFormik()`. */
  formik: any;
  id: string;

  disabled?: boolean;
  label?: string;
  labelStyle?: SxProps<Theme>;
  placeholder?: string;
}

/* eslint-disable react/jsx-props-no-spreading */
export default function FormikAutocomplete<
  FreeSolo extends boolean | undefined
>({ id, formik, ...props }: FAProps<FreeSolo>): JSX.Element {
  const {
    label,
    labelStyle,
    placeholder,
    onChange = (e, vals) => formik.setFieldValues(id, vals),
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
        value={values}
        inputValue={inputValue}
        onChange={onChange}
        onInputChange={(e, newInputValue) => {
          const options = newInputValue.split(',');

          if (options.length > 1) {
            const vals = values.concat(
              options.map((x) => x.trim()).filter((x) => x)
            );
            setInputValue('');
            return onChange(e, vals, 'selectOption');
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
