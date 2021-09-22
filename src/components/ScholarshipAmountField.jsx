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
import { getIn } from 'formik';

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
  const { labelStyle, formik } = props;

  function updateAmount(min, max) {
    formik.setFieldValue('amount.min', min, true);
    formik.setFieldValue('amount.max', max, true);
  }

  function onTypeChange(e) {
    formik.setFieldValue('amount.type', e.target.value, true);
  }

  const amountType = formik.values.amount.type;
  const minAmount = formik.values.amount.min;
  const maxAmount = formik.values.amount.max;
  const minError = getIn(formik.errors, 'amount.min');
  const maxError = getIn(formik.errors, 'amount.max');

  console.log(minError);
  function formatHelperText() {
    if (!minError && !maxError) return;
    if (getIn(formik.touched, 'amount.min') && minError) return minError;
    if (getIn(formik.touche, 'amount.max') && maxError) return maxError;
  }

  const inputFields = {};
  inputFields[AmountType.Varies] = (
    <>
      <AmountTextField
        error={Boolean(minError)}
        value={minAmount || ''}
        onChange={(e) => {
          const val = parseInt(e.target.value, 10);
          updateAmount(val || 0, maxAmount);
        }}
      />

      <RemoveIcon className={classes.dash} />

      <AmountTextField
        error={Boolean(maxError)}
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
      error={getIn(formik.touched, 'amount.min') && Boolean(minError)}
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
      <FormHelperText error>{formatHelperText()}</FormHelperText>
    </>
  );
}

ScholarshipAmountField.propTypes = {
  labelStyle: PropTypes.string,
  formik: PropTypes.object.isRequired,
};
ScholarshipAmountField.defaultProps = {
  labelStyle: '',
};
export default ScholarshipAmountField;
