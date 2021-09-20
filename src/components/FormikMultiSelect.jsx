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
  const { label, labelStyle, value, changeFn, options } = props;

  return (
    <>
      <InputLabel className={labelStyle}>{label}</InputLabel>
      <Select
        multiple
        fullWidth
        variant="outlined"
        value={value}
        onChange={(event) => changeFn(event.target.value)}
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
  labelStyle: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  changeFn: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};
