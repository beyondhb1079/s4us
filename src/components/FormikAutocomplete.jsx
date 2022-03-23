import React from 'react';
import { getIn } from 'formik';
import { Autocomplete, InputLabel, TextField } from '@mui/material';
import PropTypes from 'prop-types';

/* eslint-disable react/jsx-props-no-spreading */
function FormikAutocomplete(props) {
  const { label, id, labelStyle, formik, placeholder, ...otherProps } = props;
  const values = getIn(formik.values, id, []);

  const formatTags = (vals) => {
    const newVals = new Set(
      vals.map((v) => v.toLowerCase().replace(/\s+/g, '-'))
    );
    formik.setFieldValue(id, Array.from(newVals));
  };

  return (
    <>
      <InputLabel sx={labelStyle}>{label}</InputLabel>
      <Autocomplete
        id={id}
        multiple
        value={values}
        onChange={(e, val) =>
          id === 'tags' ? formatTags(val) : formik.setFieldValue(id, val)
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
};
FormikAutocomplete.defaultProps = {
  label: '',
  labelStyle: {},
  placeholder: '',
};
export default FormikAutocomplete;
