import React from 'react';
import { InputLabel, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { getIn } from 'formik';

/* eslint-disable react/jsx-props-no-spreading */
function FormikTextField(props) {
  const {
    label,
    labelStyle,
    id,
    formik,
    minRows,
    nested,
    value,
    ...otherProps
  } = props;

  return (
    <>
      <InputLabel sx={labelStyle}>{label}</InputLabel>
      <TextField
        id={id}
        error={Boolean(getIn(formik.errors, id))}
        helperText={getIn(formik.errors, id)}
        value={getIn(formik.values, id)}
        onChange={formik.handleChange}
        fullWidth
        multiline={minRows > 0}
        minRows={minRows}
        {...otherProps}
      />
    </>
  );
}

FormikTextField.propTypes = {
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.object,
  id: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
  minRows: PropTypes.number,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
FormikTextField.defaultProps = {
  labelStyle: null,
  minRows: 0,
  value: undefined,
};
export default FormikTextField;
