import React from 'react';
import { InputLabel, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import PropTypes from 'prop-types';

/* eslint-disable react/jsx-props-no-spreading */
function FormikAutocomplete(props) {
  const { label, id, labelStyle, options, freeSolo, formik, disabled } = props;

  return (
    <>
      <InputLabel className={labelStyle}>{label}</InputLabel>
      <Autocomplete
        disabled={disabled}
        id={id}
        freeSolo={freeSolo}
        multiple
        value={formik.values.requirements[id]}
        onChange={(e, newVal) =>
          formik.setFieldValue(
            `requirements.${id}`,
            newVal,
            /* shouldValidate = */ false
          )
        }
        options={options.map((option) => option.title)}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" fullWidth />
        )}
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
  disabled: PropTypes.bool,
};
FormikAutocomplete.defaultProps = {
  label: '',
  labelStyle: '',
  freeSolo: false,
  disabled: false,
};
export default FormikAutocomplete;
