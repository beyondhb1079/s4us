import React from 'react';
import { useFormik, getIn } from 'formik';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import validationSchema from '../validation/ValidationSchema';
import ScholarshipAmountField from './ScholarshipAmountField';
import DatePicker from './DatePicker';
import FormikTextField from './FormikTextField';

const useStyles = makeStyles((theme) => ({
  containerStyle: {
    maxWidth: 400,
  },
  fieldStyle: {
    paddingBottom: theme.spacing(1),
  },
  submitStyle: {
    marginBottom: theme.spacing(2),
  },
}));

function ScholarshipForm({ scholarship, submitFn, onSubmitError }) {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: scholarship.data,
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      scholarship.data = { ...values };
      scholarship
        .save()
        .then(submitFn)
        .then(resetForm)
        .catch(onSubmitError)
        .finally(() => setSubmitting(false));
    },
  });

  function updateAmount(min, max) {
    formik.setFieldValue('amount.min', min, true);
    formik.setFieldValue('amount.max', max, true);
  }

  return (
    <form className={classes.containerStyle} onSubmit={formik.handleSubmit}>
      <div>
        <FormikTextField label="Scholarship Name *" id="name" formik={formik} />
      </div>

      <DatePicker
        className={classes.fieldStyle}
        id="deadline"
        label="Deadline *"
        error={formik.touched.deadline && Boolean(formik.errors.deadline)}
        helperText={(formik.touched.deadline && formik.errors.deadline) || ' '}
        value={formik.values.deadline}
        onChange={(date) => formik.setFieldValue('deadline', date, true)}
      />

      <div>
        <FormikTextField
          label="Description *"
          id="description"
          formik={formik}
          rows={8}
        />
      </div>

      <div>
        <FormikTextField
          label="Scholarship Link *"
          id="website"
          formik={formik}
        />
      </div>

      <ScholarshipAmountField
        className={classes.fieldStyle}
        helperText={
          (getIn(formik.touched, 'amount.type') &&
            getIn(formik.errors, 'amount.type')) ||
          getIn(formik.errors, 'amount.min') ||
          getIn(formik.errors, 'amount.max') ||
          ''
        }
        amountType={formik.values.amount.type}
        minAmount={formik.values.amount.min}
        maxAmount={formik.values.amount.max}
        onTypeChange={(e) =>
          formik.setFieldValue('amount.type', e.target.value, true)
        }
        updateAmount={updateAmount}
      />

      <div>
        <Button
          className={classes.submitStyle}
          variant="contained"
          color="primary"
          type="submit"
          disabled={formik.isSubmitting}>
          Submit
        </Button>
      </div>
    </form>
  );
}

ScholarshipForm.propTypes = {
  scholarship: PropTypes.object.isRequired,
  submitFn: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
};

export default ScholarshipForm;
