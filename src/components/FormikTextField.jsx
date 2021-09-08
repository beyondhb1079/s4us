import React from 'react';
import { InputLabel, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

function FormikTextField(props) {
  const { label, labelStyle, id, formik, rows } = props;

  return (
    <>
      <InputLabel className={labelStyle}>{label}</InputLabel>
      <TextField
        variant="outlined"
        id={id}
        error={formik.touched[id] && Boolean(formik.errors[id])}
        helperText={formik.touched[id] && formik.errors[id]}
        value={formik.values[id]}
        onChange={formik.handleChange}
        fullWidth
        multiline={rows > 0}
        rows={rows}
      />
    </>
  );
}

FormikTextField.propTypes = {
  label: PropTypes.string.isRequired,
  labelStyle: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
  rows: PropTypes.number,
};
FormikTextField.defaultProps = {
  rows: 0,
};
export default FormikTextField;
