import React from 'react';
import AmountType from '../types/AmountType';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

function ScholarshipAmountField(props) {
  const { label, value, amountTypes } = props;

  return (
    <FormControl>
      <InputLabel shrink>{label}</InputLabel>
      <Select>
        {Object.keys(amountTypes).map((option) => {
          return (
            <MenuItem key={option} value={amountTypes[option]}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default ScholarshipAmountField;
