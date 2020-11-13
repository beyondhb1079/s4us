import React from 'react';
import {
  FormLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AmountType from '../types/AmountType';
import AmountTextField from './AmountTextField';

const useStyles = makeStyles({
  formControlStyle: {
    paddingTop: 20,
  },
  amountFieldStyle: {
    display: 'flex',
    alignItems: 'center',
  },
});

function ScholarshipAmountField(props) {
  const classes = useStyles();
  const {
    typeError,
    minAmountError,
    maxAmountError,
    helperText,
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
              error={amountType === AmountType.Range && minAmountError}
              value={minAmount}
              onChange={(e) => updateAmount(e.target.value, maxAmount)}
              disabled={amountType !== AmountType.Range}
            />
            to
            <AmountTextField
              error={amountType === AmountType.Range && maxAmountError}
              value={maxAmount}
              onChange={(e) => updateAmount(minAmount, e.target.value)}
              disabled={amountType !== AmountType.Range}
            />
          </div>
        );
      case AmountType.Fixed:
        return (
          <div className={classes.amountFieldStyle}>
            Fixed Amount:
            <AmountTextField
              error={amountType === AmountType.Fixed && minAmountError}
              value={minAmount}
              onChange={(e) => updateAmount(e.target.value, e.target.value)}
              disabled={amountType !== AmountType.Fixed}
            />
          </div>
        );
      case AmountType.FullRide:
        return 'Full Tuition';
      default:
        return 'Unknown';
    }
  }

  return (
    <FormControl error={typeError} className={classes.formControlStyle}>
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
      <FormHelperText error>
        {(typeError || minAmountError || maxAmountError) && helperText}
      </FormHelperText>
    </FormControl>
  );
}

ScholarshipAmountField.propTypes = {
  amountType: PropTypes.oneOf(Object.values(AmountType)),
  minAmount: PropTypes.string.isRequired,
  maxAmount: PropTypes.string.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  updateAmount: PropTypes.func.isRequired,
};
ScholarshipAmountField.defaultProps = {
  amountType: null,
};
export default ScholarshipAmountField;
