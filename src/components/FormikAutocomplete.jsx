import React from 'react';
import { getIn } from 'formik';
import { Autocomplete, InputLabel, TextField } from '@mui/material';
import PropTypes from 'prop-types';

/* eslint-disable react/jsx-props-no-spreading */
function FormikAutocomplete(props) {
  const { label, id, labelStyle, formik, placeholder, ...otherProps } = props;
  const values = getIn(formik.values, id, []);
  return (
    <>
      <InputLabel className={labelStyle}>{label}</InputLabel>
      <Autocomplete
        id={id}
        multiple
        value={values}
        onChange={formik.handleChange}
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
  labelStyle: PropTypes.string,
  formik: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
};
FormikAutocomplete.defaultProps = {
  label: '',
  labelStyle: '',
  placeholder: '',
};
export default FormikAutocomplete;
