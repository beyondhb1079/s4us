import React from 'react';
import { InputLabel, TextField } from '@mui/material';
import PropTypes from 'prop-types';

function FormikTextField(props) {
  const { label, labelStyle, id, formik, minRows } = props;

  return (
    <>
      <InputLabel className={labelStyle}>{label}</InputLabel>
      <TextField
        id={id}
        error={Boolean(formik.errors[id])}
        helperText={formik.errors[id]}
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
};
FormikTextField.defaultProps = {
  labelStyle: null,
  minRows: 0,
};
export default FormikTextField;
