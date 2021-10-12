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
    type,
    nested,
    value,
    ...otherProps
  } = props;

  return (
    <>
      <InputLabel className={labelStyle}>{label}</InputLabel>
      <TextField
        id={id}
        type={type}
        error={
          nested
            ? Boolean(getIn(formik.errors, id))
            : Boolean(formik.errors[id])
        }
        helperText={nested ? getIn(formik.errors, id) : formik.errors[id]}
        value={value ?? formik.values[id]}
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
  labelStyle: PropTypes.string,
  id: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
  minRows: PropTypes.number,
  type: PropTypes.string,
  nested: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
FormikTextField.defaultProps = {
  labelStyle: null,
  minRows: 0,
  type: 'text',
  nested: false,
  value: undefined,
};
export default FormikTextField;
