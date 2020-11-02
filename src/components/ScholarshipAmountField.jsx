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

const useStyles = makeStyles((theme) => ({
  spanStyle: {
    margin: theme.spacing(1),
  },
  disabledSpan: {
    opacity: 0.5,
  },
}));

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
          <>
            <AmountTextField
              label="Minimum Amount"
              value={minAmount || ''}
              onChange={(e) =>
                updateAmount(parseInt(e.target.value, 10) || '', maxAmount)
              }
              disabled={amountType !== AmountType.Range}
            />
            <AmountTextField
              label="Maximum Amount"
              value={maxAmount || ''}
              onChange={(e) =>
                updateAmount(minAmount, parseInt(e.target.value, 10) || '')
              }
              disabled={amountType !== AmountType.Range}
            />
          </>
        );
      case AmountType.Fixed:
        return (
          <AmountTextField
            label="Fixed Amount"
            value={minAmount}
            onChange={(e) =>
              updateAmount(
                parseInt(e.target.value, 10) || '',
                parseInt(e.target.value, 10) || ''
              )
            }
            disabled={amountType !== AmountType.Fixed}
          />
        );
      case AmountType.FullRide:
        return (
          <span
            className={`${classes.spanStyle} ${
              amountType !== AmountType.FullRide && classes.disabledSpan
            }`}>
            Full Tuition
          </span>
        );
      default:
        return (
          <span
            className={`${classes.spanStyle} ${
              amountType !== AmountType.Unknown && classes.disabledSpan
            }`}>
            Unknown
          </span>
        );
    }
  }

  return (
    <FormControl>
      <FormLabel>Amount Type</FormLabel>
      <RadioGroup value={amountType} onChange={onTypeChange}>
        {Object.keys(AmountType).map((option) => {
          return (
            <FormControlLabel
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
  amountType: PropTypes.string.isRequired,
  minAmount: PropTypes.number.isRequired,
  maxAmount: PropTypes.number.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  updateAmount: PropTypes.func.isRequired,
};
export default ScholarshipAmountField;
