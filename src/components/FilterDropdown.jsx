import React from 'react';
import { MenuItem, FormControl, Select } from '@mui/material';
import PropTypes from 'prop-types';

const FilterDropdown = ({ label, items, value, removeNone, onChange }) => (
  <FormControl variant="outlined" sx={{ margin: 1, minWidth: 120 }}>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      displayEmpty
      sx={{ height: (theme) => theme.spacing(4) }}>
      {!removeNone && (
        <MenuItem value="">
          <em>{label}</em>
        </MenuItem>
      )}
      {Object.keys(items).map((key) => (
        <MenuItem key={key} value={key}>
          {items[key]}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

FilterDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  items: PropTypes.objectOf(PropTypes.string).isRequired,
  removeNone: PropTypes.bool,
  onChange: PropTypes.func,
};

FilterDropdown.defaultProps = {
  value: '',
  onChange: () => {},
  removeNone: false,
};

export default FilterDropdown;
