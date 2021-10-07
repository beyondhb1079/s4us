import React from 'react';
import { InputLabel, TextField } from '@mui/material';
import PropTypes from 'prop-types';

function FormikTextField(props) {
  const { label, labelStyle, id, formik, minRows, disabled } = props;

  return (
    <>
      <InputLabel className={labelStyle}>{label}</InputLabel>
      <TextField
        disabled={disabled}
        variant="outlined"
        id={id}
        error={formik.touched[id] && Boolean(formik.errors[id])}
        helperText={formik.touched[id] && formik.errors[id]}
        value={formik.values[id]}
        onChange={formik.handleChange}
        fullWidth
        multiline={minRows > 0}
        minRows={minRows}
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
  disabled: PropTypes.bool,
};
FormikTextField.defaultProps = {
  labelStyle: null,
  minRows: 0,
  disabled: false,
};
export default FormikTextField;
