import React from 'react';
import {
  InputLabel,
  FormHelperText,
  Select,
  MenuItem,
  Grid,
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AmountType from '../types/AmountType';
import AmountTextField from './AmountTextField';

const useStyles = makeStyles((theme) => ({
  amountSelect: {
    marginTop: theme.spacing(1),
    minWidth: 150,
  },
  amountLabel: {
    marginLeft: theme.spacing(1),
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

  const isRange = amountType === AmountType.Varies;
  const isFixed = amountType === AmountType.Fixed;
  const error = !!helperText; // no error if helperText empty

  const labels = {};
  labels[AmountType.Varies] = (
    <Grid container alignItems="center">
      <Grid item>
        <AmountTextField
          error={isRange && error && (!!maxAmount || minAmount >= maxAmount)}
          value={minAmount || ''}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            updateAmount(val || 0, maxAmount);
          }}
          disabled={!isRange}
        />
      </Grid>

      <Grid item>
        <RemoveIcon />
      </Grid>

      <Grid item>
        <AmountTextField
          error={isRange && error && !minAmount && !maxAmount}
          value={maxAmount || ''}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            updateAmount(minAmount, val || 0);
          }}
          disabled={!isRange}
        />
      </Grid>
    </Grid>
  );
  labels[AmountType.Fixed] = (
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
  labels[AmountType.FullTuition] = <AmountTextField disabled />;

  return (
    <>
      <InputLabel>Award Amount *</InputLabel>
      <Grid container spacing={3}>
        <Grid item>
          <Select
            className={classes.amountSelect}
            variant="outlined"
            value={amountType}
            onChange={onTypeChange}
            displayEmpty>
            <MenuItem value={null}>None</MenuItem>
            <MenuItem value="FIXED">Fixed</MenuItem>
            <MenuItem value="VARIES">Varies</MenuItem>
            <MenuItem value="FULL_TUITION">Full Tuition</MenuItem>
          </Select>
        </Grid>

        <Grid item>{labels[amountType]}</Grid>
      </Grid>
      <FormHelperText error>{helperText || ' '}</FormHelperText>
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
  amountType: null,
  helperText: '',
  minAmount: 0,
  maxAmount: 0,
};
export default ScholarshipAmountField;

/*
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
*/
