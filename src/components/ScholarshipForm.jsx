import React from 'react';
import firebase from 'firebase';
import { useFormik, getIn } from 'formik';
import { Button } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import validationSchema from '../validation/ValidationSchema';
import Scholarships from '../models/Scholarships';
import ScholarshipAmountField from './ScholarshipAmountField';
import DatePicker from './DatePicker';
import SubmissionAlert from './SubmissionAlert';
import FormikTextField from './FormikTextField';
import InitialValues from '../formik/InitialValues';

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

function ScholarshipForm({ setSubmissionAlert }) {
  const classes = useStyles();
  const user = firebase.auth().currentUser;

  const formik = useFormik({
    initialValues: InitialValues,
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      Scholarships.new({
        ...values,
        author: {
          id: user?.uid,
          email: user?.email,
        },
      })
        .save()
        .then((scholarship) => {
          setSubmissionAlert(
            <SubmissionAlert
              id={scholarship.id}
              name={scholarship.data.name}
              closeFn={() => setSubmissionAlert(null)}
            />
          );
          resetForm();
        })
        .catch((error) =>
          setSubmissionAlert(
            <Alert severity="error" onClose={() => setSubmissionAlert(null)}>
              <AlertTitle>Error</AlertTitle>
              {error.toString()}
            </Alert>
          )
        )
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
  setSubmissionAlert: PropTypes.func.isRequired,
};

export default ScholarshipForm;
