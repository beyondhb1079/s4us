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

const useStyles = makeStyles((theme) => ({
  formControlStyle: {
    paddingTop: theme.spacing(2),
  },
  amountFieldStyle: {
    display: 'flex',
    alignItems: 'center',
  },
}));

function ScholarshipAmountField(props) {
  const classes = useStyles();
  const {
    helperText,
    amountType,
    minAmount,
    maxAmount,
    onTypeChange,
    updateAmount,
  } = props;

  const isRange = amountType === AmountType.Range;
  const isFixed = amountType === AmountType.Fixed;
  const error = !!helperText; // no error if helperText empty

  function displayAmountFields(option) {
    switch (option) {
      case AmountType.Range:
        return (
          <div className={classes.amountFieldStyle}>
            Range:
            <AmountTextField
              error={isRange && error && minAmount >= maxAmount}
              value={minAmount || ''}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                updateAmount(val || 0, maxAmount);
              }}
              disabled={!isRange}
            />
            to
            <AmountTextField
              error={isRange && error && !minAmount && !maxAmount}
              value={maxAmount || ''}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                updateAmount(minAmount, val || 0);
              }}
              disabled={!isRange}
            />
          </div>
        );
      case AmountType.Fixed:
        return (
          <div className={classes.amountFieldStyle}>
            Fixed Amount:
            <AmountTextField
              error={isFixed && error}
              value={minAmount || ''}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                updateAmount(val || 0, val || 0);
              }}
              disabled={!isFixed}
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
    <FormControl error={error} className={classes.formControlStyle}>
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
      <FormHelperText error>{error ? helperText : ' '}</FormHelperText>
    </FormControl>
  );
}

ScholarshipAmountField.propTypes = {
  amountType: PropTypes.oneOf(Object.values(AmountType)),
  minAmount: PropTypes.number.isRequired,
  maxAmount: PropTypes.number.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  updateAmount: PropTypes.func.isRequired,
  helperText: PropTypes.string,
};
ScholarshipAmountField.defaultProps = {
  amountType: null,
  helperText: '',
};
export default ScholarshipAmountField;
