import React from 'react';
import {
  InputLabel,
  Grid,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import PropTypes from 'prop-types';
import AmountType from '../types/AmountType';
import AmountTextField from './AmountTextField';

const useStyles = makeStyles(() => ({
  amountSelect: {
    minWidth: 150,
  },
  dash: {
    height: '100%',
    textAlign: 'center',
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
    labelStyle,
  } = props;

  const error = !!helperText; // no error if helperText empty

  const inputFields = {};
  inputFields[AmountType.Varies] = (
    <>
      <AmountTextField
        error={
          error && (minAmount < 0 || (minAmount && minAmount >= maxAmount))
        }
        value={minAmount || ''}
        onChange={(e) => {
          const val = parseInt(e.target.value, 10);
          updateAmount(val || 0, maxAmount);
        }}
      />

      <RemoveIcon className={classes.dash} />

      <AmountTextField
        error={error && maxAmount < 0}
        value={maxAmount || ''}
        onChange={(e) => {
          const val = parseInt(e.target.value, 10);
          updateAmount(minAmount, val || 0);
        }}
      />
    </>
  );
  inputFields[AmountType.Fixed] = (
    <AmountTextField
      error={error}
      value={minAmount || ''}
      onChange={(e) => {
        const val = parseInt(e.target.value, 10);
        updateAmount(val || 0, val || 0);
      }}
    />
  );

  return (
    <>
      <InputLabel className={labelStyle}>Award Amount *</InputLabel>
      <Grid container spacing={3}>
        <Grid item>
          <Select
            className={classes.amountSelect}
            variant="outlined"
            value={amountType}
            onChange={onTypeChange}>
            <MenuItem value={AmountType.Fixed}>Fixed</MenuItem>
            <MenuItem value={AmountType.Varies}>Varies</MenuItem>
            <MenuItem value={AmountType.FullTuition}>Full Tuition</MenuItem>
          </Select>
        </Grid>

        <Grid item>{amountType && inputFields[amountType]}</Grid>
      </Grid>
      <FormHelperText error>{helperText}</FormHelperText>
    </>
  );
}

ScholarshipAmountField.propTypes = {
  amountType: PropTypes.oneOf(Object.values(AmountType)),
  minAmount: PropTypes.number,
  maxAmount: PropTypes.number,
  onTypeChange: PropTypes.func.isRequired,
  updateAmount: PropTypes.func.isRequired,
  helperText: PropTypes.string,
  labelStyle: PropTypes.string,
};
ScholarshipAmountField.defaultProps = {
  amountType: undefined,
  helperText: '',
  minAmount: 0,
  maxAmount: 0,
  labelStyle: '',
};
export default ScholarshipAmountField;
