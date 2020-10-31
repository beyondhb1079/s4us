import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AmountType from '../types/AmountType';

const useStyles = makeStyles({
  formControl: {
    minWidth: 200,
  },
});

function ScholarshipAmountField(props) {
  const classes = useStyles();
  const {
    amountType,
    minAmount,
    maxAmount,
    onTypeChange,
    onMinChange,
    onMaxChange,
    updateMinMax,
  } = props;

  function displayAmountFields() {
    if (amountType === AmountType.Fixed) {
      return (
        <TextField
          label="Amount"
          type="number"
          InputLabelProps={{ shrink: true }}
          fullWidth
          InputProps={{ inputProps: { min: 0, step: 50 } }}
          value={minAmount}
          onChange={(e) => updateMinMax(parseInt(e.target.value, 10) || '')}
        />
      );
    }
    if (amountType === AmountType.Range) {
      return ['minAmount', 'maxAmount'].map((field) => (
        <TextField
          key={field}
          label={field}
          type="number"
          InputLabelProps={{ shrink: true }}
          fullWidth
          InputProps={{ inputProps: { min: 0, step: 50 } }}
          value={field === 'minAmount' ? minAmount : maxAmount}
          onChange={field === 'minAmount' ? onMinChange : onMaxChange}
        />
      ));
    }
    return <div />;
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink>Amount Type</InputLabel>
      <Select value={amountType} onChange={onTypeChange}>
        {Object.keys(AmountType).map((option) => {
          return (
            <MenuItem key={option} value={AmountType[option]}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
      {displayAmountFields()}
    </FormControl>
  );
}
ScholarshipAmountField.propTypes = {
  amountType: PropTypes.oneOfType(PropTypes.string).isRequired,
  minAmount: PropTypes.number.isRequired,
  maxAmount: PropTypes.number.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  onMinChange: PropTypes.func.isRequired,
  onMaxChange: PropTypes.func.isRequired,
  updateMinMax: PropTypes.func.isRequired,
};
export default ScholarshipAmountField;
