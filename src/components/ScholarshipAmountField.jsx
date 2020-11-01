import React from 'react';
import {
  TextField,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AmountType from '../types/AmountType';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
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

  function amountTextField(label, value, onChange) {
    return (
      <TextField
        className={classes.formControl}
        label={label}
        type="number"
        InputLabelProps={{ shrink: true }}
        InputProps={{ inputProps: { min: 0, step: 50 } }}
        disabled={
          amountType !== AmountType.Range && amountType !== AmountType.Fixed
        }
        value={value}
        onChange={onChange}
      />
    );
  }

  function displayAmountFields() {
    switch (amountType) {
      case AmountType.Range:
        return (
          <>
            {amountTextField('Minimum Amount', minAmount, (e) =>
              updateAmount('minAmount', parseInt(e.target.value, 10) || '')
            )}
            {amountTextField('Maximum Amount', maxAmount, (e) =>
              updateAmount('maxAmount', parseInt(e.target.value, 10) || '')
            )}
          </>
        );
      default:
        return amountTextField('Amount', minAmount, (e) =>
          updateAmount(
            'minAmount',
            parseInt(e.target.value, 10) || '',
            'maxAmount'
          )
        );
    }
  }

  return (
    <Grid container alignItems="center" className={classes.formControl}>
      <Grid item xs={6} sm={4} md={3}>
        <FormLabel>Amount Type</FormLabel>
        <RadioGroup value={amountType} onChange={onTypeChange}>
          {Object.keys(AmountType).map((option) => {
            return (
              <FormControlLabel
                key={option}
                value={AmountType[option]}
                control={<Radio />}
                label={option}
              />
            );
          })}
        </RadioGroup>
      </Grid>

      <Grid item xs={6}>
        {displayAmountFields()}
      </Grid>
    </Grid>
  );
}

ScholarshipAmountField.propTypes = {
  amountType: PropTypes.oneOfType(PropTypes.string).isRequired,
  minAmount: PropTypes.number.isRequired,
  maxAmount: PropTypes.number.isRequired,
  onTypeChange: PropTypes.func.isRequired,
  updateAmount: PropTypes.func.isRequired,
};
export default ScholarshipAmountField;
