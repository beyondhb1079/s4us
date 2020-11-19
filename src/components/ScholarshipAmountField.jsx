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

  const labels = {};
  labels[AmountType.Range] = (
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
  labels[AmountType.Fixed] = (
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
  labels[AmountType.FullRide] = 'Full Tuition';

  // /*error={error}*/?
  return (
    <FormControl className={classes.formControlStyle}>
      <FormLabel>Amount Type</FormLabel>
      <RadioGroup value={amountType} onChange={onTypeChange}>
        {Object.keys(AmountType).map((option) => (
          <FormControlLabel
            className={classes.formControlLabelStyle}
            key={option}
            value={AmountType[option]}
            control={<Radio />}
            label={labels[AmountType[option]] || 'Unknown'}
          />
        ))}
      </RadioGroup>
      <FormHelperText error>{helperText || ' '}</FormHelperText>
    </FormControl>
  );
}

ScholarshipAmountField.propTypes = {
  amountType: PropTypes.oneOf(Object.values(AmountType.concat([' ']))),
  minAmount: PropTypes.number.isRequired,
  maxAmount: PropTypes.number.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  updateAmount: PropTypes.func.isRequired,
  helperText: PropTypes.string,
};
ScholarshipAmountField.defaultProps = {
  amountType: '',
  minAmount: 0,
  maxAmount: 0,
};
export default ScholarshipAmountField;
