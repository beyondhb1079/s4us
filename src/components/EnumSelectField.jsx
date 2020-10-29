import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';

function EnumSelectField(props) {
  const { label, value, onChange, enums } = props;
  return (
    <FormControl>
      <InputLabel shrink>{label}</InputLabel>
      <Select {...{ value, onChange }}>
        {Object.keys(enums).map((option) => {
          return (
            <MenuItem key={option} value={enums[option]}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
EnumSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  enums: PropTypes.oneOfType([PropTypes.string]).isRequired,
};
export default EnumSelectField;
