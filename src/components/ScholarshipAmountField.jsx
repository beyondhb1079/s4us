import React from 'react';
import {
  Grid,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import PropTypes from 'prop-types';
import AmountType from '../types/AmountType';
import AmountTextField from './AmountTextField';
import { getIn } from 'formik';
import { useTranslation } from 'react-i18next';

function ScholarshipAmountField({ labelStyle, formik }) {
  const amountType = formik.values.amount.type;
  const minError = getIn(formik.errors, 'amount.min');
  const maxError = getIn(formik.errors, 'amount.max');
  const { t } = useTranslation('scholarshipAmount');

  let helperText = minError || maxError || '';

  const inputFields = {};
  inputFields[AmountType.Varies] = (
    <>
      <AmountTextField
        error={Boolean(minError)}
        value={formik.values.amount.min || ''}
        onChange={(e) => {
          const val = parseInt(e.target.value, 10);
          formik.setFieldValue('amount.min', val || 0);
        }}
        placeholder={t('noMin')}
      />

      <RemoveIcon sx={{ height: 1.0, textAlign: 'center' }} />

      <AmountTextField
        error={Boolean(maxError)}
        value={formik.values.amount.max || ''}
        onChange={(e) => {
          const val = parseInt(e.target.value, 10);
          formik.setFieldValue('amount.max', val || 0);
        }}
        placeholder={t('noMax')}
      />
    </>
  );
  inputFields[AmountType.Fixed] = (
    <AmountTextField
      error={Boolean(minError)}
      value={formik.values.amount.min || ''}
      onChange={(e) => {
        const val = parseInt(e.target.value, 10);
        formik.setFieldValue('amount.min', val || 0);
        formik.setFieldValue('amount.max', val || 0);
      }}
      placeholder={t('unset')}
    />
  );

  return (
    <>
      <InputLabel sx={labelStyle}>{t('awardAmount')} *</InputLabel>
      <Grid container spacing={3}>
        <Grid item>
          <Select
            name="amount.type"
            sx={{ minWidth: 150 }}
            variant="outlined"
            value={amountType}
            onChange={(e) => {
              formik.setFieldValue('amount.min', 0);
              formik.setFieldValue('amount.max', 0);
              formik.handleChange('amount.type')(e);
            }}>
            <MenuItem value={AmountType.Fixed}>{t('fixed')}</MenuItem>
            <MenuItem value={AmountType.Varies}>{t('varies')}</MenuItem>
            <MenuItem value={AmountType.FullTuition}>
              {t('fullTuition')}
            </MenuItem>
          </Select>
        </Grid>

        <Grid item>{amountType && inputFields[amountType]}</Grid>
      </Grid>
      <FormHelperText error>{helperText}</FormHelperText>
    </>
  );
}

ScholarshipAmountField.propTypes = {
  labelStyle: PropTypes.object,
  formik: PropTypes.object.isRequired,
};
ScholarshipAmountField.defaultProps = {
  labelStyle: {},
};
export default ScholarshipAmountField;
