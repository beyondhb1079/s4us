import React from 'react';
import { Autocomplete, InputLabel, TextField } from '@mui/material';
import PropTypes from 'prop-types';

/* eslint-disable react/jsx-props-no-spreading */
function FormikAutocomplete(props) {
  const { label, id, labelStyle, options, freeSolo, formik, placeholder } =
    props;

  return (
    <>
      <InputLabel className={labelStyle}>{label}</InputLabel>
      <Autocomplete
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
        options={options}
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
