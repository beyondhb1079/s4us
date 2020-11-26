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
  amountFieldStyle: {
    display: 'flex',
    alignItems: 'center',
  },
});

function ScholarshipAmountField(props) {
  const classes = useStyles();
  const {
    className,
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

  const labels = {};
  labels[AmountType.Range] = (
    <div className={classes.amountFieldStyle}>
      Range:
      <AmountTextField
        error={isRange && error && (!!maxAmount || minAmount >= maxAmount)}
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
  labels[AmountType.Fixed] = (
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
  labels[AmountType.FullTuition] = 'Full Tuition';

  return (
    <FormControl error={error} className={className}>
      <FormLabel>Amount Type *</FormLabel>
      <RadioGroup value={amountType} onChange={onTypeChange}>
        {Object.values(AmountType).map((type) => (
          <FormControlLabel
            key={type}
            value={type}
            control={<Radio />}
            label={labels[type] || 'Unknown'}
          />
        ))}
      </RadioGroup>
      <FormHelperText error>{helperText || ' '}</FormHelperText>
    </FormControl>
  );
}

ScholarshipAmountField.propTypes = {
  className: PropTypes.string,
  amountType: PropTypes.oneOf(Object.values(AmountType)),
  minAmount: PropTypes.number,
  maxAmount: PropTypes.number,
  onTypeChange: PropTypes.func.isRequired,
  updateAmount: PropTypes.func.isRequired,
  helperText: PropTypes.string,
};
ScholarshipAmountField.defaultProps = {
  className: null,
  amountType: null,
  helperText: '',
  minAmount: 0,
  maxAmount: 0,
};
export default ScholarshipAmountField;
