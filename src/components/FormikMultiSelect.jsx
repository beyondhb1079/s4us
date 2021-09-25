import React from 'react';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';

const MenuProps = {
  getContentAnchorEl: null, //TODO: remove this when material-ui gets updated to version 5
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  PaperProps: {
    style: {
      maxHeight: 250,
      width: 250,
    },
  },
};

function FormikMultiSelect(props) {
  const { label, id, labelStyle, formik, options, disabled } = props;

  return (
    <>
      <InputLabel className={labelStyle}>{label}</InputLabel>
      <Select
        disabled={disabled}
        multiple
        fullWidth
        id={id}
        variant="outlined"
        value={formik.values.requirements[id]}
        onChange={(e) =>
          formik.setFieldValue(
            `requirements.${id}`,
            e.target.value,
            /* shouldValidate = */ false
          )
        }
        MenuProps={MenuProps}>
        {options.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

export default FormikMultiSelect;

FormikMultiSelect.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  labelStyle: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
};

FormikMultiSelect.defaultProps = {
  disabled: false,
};
