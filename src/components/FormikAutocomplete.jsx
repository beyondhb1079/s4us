import React, { useState } from 'react';
import { getIn } from 'formik';
import {
  Autocomplete,
  createFilterOptions,
  InputLabel,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';

const filterOptions = createFilterOptions({
  stringify: (option) =>
    `${option.replace(/\([A-Z]+\)/, '').replaceAll(/[^A-Z]/g, '')} ${option}`,
});

/* eslint-disable react/jsx-props-no-spreading */
function FormikAutocomplete(props) {
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
      <InputLabel sx={labelStyle}>{label}</InputLabel>
      <Autocomplete
        id={id}
        multiple
        filterOptions={filterOptions}
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

FormikAutocomplete.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  labelStyle: PropTypes.object,
  formik: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};
FormikAutocomplete.defaultProps = {
  label: '',
  labelStyle: {},
  placeholder: '',
  onChange: undefined,
};
export default FormikAutocomplete;
