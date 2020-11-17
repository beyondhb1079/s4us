import React from 'react';
import {
  FormLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AmountType from '../types/AmountType';
import AmountTextField from './AmountTextField';

const useStyles = makeStyles({
  amountFieldStyle: {
    display: 'flex',
    alignItems: 'center',
  },
});

function ScholarshipAmountField(props) {
  const classes = useStyles();
  const {
    amountType,
    minAmount,
    maxAmount,
    onTypeChange,
    updateAmount,
  } = props;

  function displayAmountFields(option) {
    switch (option) {
      case AmountType.Range:
        return (
          <div className={classes.amountFieldStyle}>
            Range:
            <AmountTextField
              value={minAmount || ''} // hack so that the placeholer 'Unknown' shows up instead of the default value of 0
              onChange={(e) =>
                updateAmount(parseInt(e.target.value, 10) || '', maxAmount)
              }
              disabled={amountType !== AmountType.Range}
            />
            to
            <AmountTextField
              value={maxAmount || ''}
              onChange={(e) =>
                updateAmount(minAmount, parseInt(e.target.value, 10) || '')
              }
              disabled={amountType !== AmountType.Range}
            />
          </div>
        );
      case AmountType.Fixed:
        return (
          <div className={classes.amountFieldStyle}>
            Fixed Amount:
            <AmountTextField
              value={minAmount}
              onChange={(e) =>
                updateAmount(
                  parseInt(e.target.value, 10) || '',
                  parseInt(e.target.value, 10) || ''
                )
              }
              disabled={amountType !== AmountType.Fixed}
            />
          </div>
        );
      case AmountType.FullTuition:
        return 'Full Tuition';
      default:
        return 'Unknown';
    }
  }

  return (
    <FormControl>
      <FormLabel>Amount Type</FormLabel>
      <RadioGroup value={amountType} onChange={onTypeChange}>
        {Object.keys(AmountType).map((option) => {
          return (
            <FormControlLabel
              className={classes.formControlLabelStyle}
              key={option}
              value={AmountType[option]}
              control={<Radio />}
              label={displayAmountFields(AmountType[option])}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}

ScholarshipAmountField.propTypes = {
  amountType: PropTypes.oneOf(Object.keys(AmountType)).isRequired, // supports default value of empty string
  minAmount: PropTypes.number.isRequired,
  maxAmount: PropTypes.number.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  updateAmount: PropTypes.func.isRequired,
};
export default ScholarshipAmountField;
