import React from 'react';
import { getIn } from 'formik';
import { Autocomplete, InputLabel, TextField } from '@mui/material';
import PropTypes from 'prop-types';

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

  return (
    <>
      <InputLabel sx={labelStyle}>{label}</InputLabel>
      <Autocomplete
        id={id}
        multiple
        value={values}
        onChange={(e, val) =>
          onChange ? onChange(val) : formik.setFieldValue(id, val)
        }
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
  onchange: undefined,
};
export default FormikAutocomplete;
