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

  const amountType = formik.values.amount.type;
  const minError = getIn(formik.errors, 'amount.min');
  const maxError = getIn(formik.errors, 'amount.max');

  let helperText = '';
  if (
    getIn(formik.touched, 'amount.min') ||
    getIn(formik.touched, 'amount.max')
  ) {
    helperText = minError || maxError;
  }

  const inputFields = {};
  inputFields[AmountType.Varies] = (
    <>
      <AmountTextField
        error={Boolean(minError)}
        value={formik.values.amount.min || ''}
        onChange={(e) => {
          const val = parseInt(e.target.value, 10);
          formik.setFieldValue('amount.min', val || 0, true);
        }}
      />

      <RemoveIcon className={classes.dash} />

      <AmountTextField
        error={Boolean(maxError)}
        value={formik.values.amount.max || ''}
        onChange={(e) => {
          const val = parseInt(e.target.value, 10);
          formik.setFieldValue('amount.max', val || 0, true);
        }}
      />
    </>
  );
  inputFields[AmountType.Fixed] = (
    <AmountTextField
      error={getIn(formik.touched, 'amount.min') && Boolean(minError)}
      value={formik.values.amount.min || ''}
      onChange={(e) => {
        const val = parseInt(e.target.value, 10);
        formik.setFieldValue('amount.min', val || 0, true);
        formik.setFieldValue('amount.max', val || 0, true);
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
            onChange={(e) =>
              formik.setFieldValue('amount.type', e.target.value, true)
            }>
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
  labelStyle: PropTypes.string,
  formik: PropTypes.object.isRequired,
};
ScholarshipAmountField.defaultProps = {
  labelStyle: '',
};
export default ScholarshipAmountField;
