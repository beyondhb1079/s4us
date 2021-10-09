import React from 'react';
import { Autocomplete, InputLabel, TextField } from '@mui/material';
import PropTypes from 'prop-types';

/* eslint-disable react/jsx-props-no-spreading */
function FormikAutocomplete(props) {
  const { label, id, labelStyle, formik, placeholder, ...otherProps } = props;

  return (
    <>
      <InputLabel className={labelStyle}>{label}</InputLabel>
      <Autocomplete
        id={id}
        multiple
        value={formik.values.requirements[id]}
        onChange={(e, newVal) =>
          formik.setFieldValue(`requirements.${id}`, newVal)
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            fullWidth
            placeholder={
              formik.values.requirements[id].length == 0 ? placeholder : ''
            }
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
  options: PropTypes.array.isRequired,
  freeSolo: PropTypes.bool,
  formik: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
};
FormikAutocomplete.defaultProps = {
  label: '',
  labelStyle: '',
  freeSolo: false,
  placeholder: '',
};
export default FormikAutocomplete;
