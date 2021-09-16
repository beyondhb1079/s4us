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

const useStyles = makeStyles((theme) => ({
  amountSelect: {
    minWidth: 150,
  },
  dash: {
    marginTop: theme.spacing(2),
  },
  inputLabel: {
    marginBottom: theme.spacing(1),
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

  const isVaries = amountType === AmountType.Varies;
  const isFixed = amountType === AmountType.Fixed;
  const error = !!helperText; // no error if helperText empty

  const inputFields = {};
  inputFields[AmountType.Varies] = (
    <>
      <AmountTextField
        error={isVaries && error && (!!maxAmount || minAmount >= maxAmount)}
        value={minAmount || ''}
        onChange={(e) => {
          const val = parseInt(e.target.value, 10);
          updateAmount(val || 0, maxAmount);
        }}
        disabled={!isVaries}
      />

      <RemoveIcon className={classes.dash} />

      <AmountTextField
        error={isVaries && error && !minAmount && !maxAmount}
        value={maxAmount || ''}
        onChange={(e) => {
          const val = parseInt(e.target.value, 10);
          updateAmount(minAmount, val || 0);
        }}
        disabled={!isVaries}
      />
    </>
  );
  inputFields[AmountType.Fixed] = (
    <AmountTextField
      error={isFixed && error}
      value={minAmount || ''}
      onChange={(e) => {
        const val = parseInt(e.target.value, 10);
        updateAmount(val || 0, val || 0);
      }}
      disabled={!isFixed}
    />
  );

  return (
    <>
      <InputLabel className={classes.inputLabel}>Award Amount *</InputLabel>
      <Grid container spacing={3}>
        <Grid item>
          <Select
            className={classes.amountSelect}
            variant="outlined"
            value={amountType}
            onChange={onTypeChange}
            displayEmpty>
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
};
ScholarshipAmountField.defaultProps = {
  amountType: '',
  helperText: '',
  minAmount: 0,
  maxAmount: 0,
};
export default ScholarshipAmountField;
