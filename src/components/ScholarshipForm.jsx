import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik, getIn } from 'formik';
import firebase from 'firebase';
import {
  Button,
  TextField,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Grid,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ScholarshipAmountField from './ScholarshipAmountField';
import DatePicker from './DatePicker';
import validationSchema from '../validation/ValidationSchema';
import Scholarships from '../models/Scholarships';

const useStyles = makeStyles((theme) => ({
  submitStyle: {
    marginTop: theme.spacing(2),
  },
}));

function ScholarshipForm({ setSubmissionAlert }) {
  const classes = useStyles();
  const user = firebase.auth().currentUser;
  const [activeStep, setActiveStep] = useState(0);

  const formik = useFormik({
    initialValues: {
      name: '',
      deadline: null,
      description: '',
      amount: {
        type: null,
        min: 0,
        max: 0,
      },
      website: '',
      organization: '',
    },
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
            <Alert
              severity="success"
              action={
                <>
                  <Button
                    color="inherit"
                    size="medium"
                    component={Link}
                    to={`/scholarships/${scholarship.id}`}>
                    VIEW
                  </Button>
                  <IconButton
                    size="medium"
                    color="inhert"
                    onClick={() => setSubmissionAlert(null)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </>
              }>
              <AlertTitle>Success</AlertTitle>
              {`${scholarship.data.name} submitted successfully.`}
            </Alert>
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

  const stepperItems = {};
  stepperItems.General = (
    <Grid container spacing={5}>
      <Grid item xs={6}>
        <TextField
          variant="outlined"
          id="name"
          label="Scholarship Name *"
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={(formik.touched.name && formik.errors.name) || ' '}
          value={formik.values.name}
          onChange={formik.handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          variant="outlined"
          id="organization"
          label="Organization *"
          error={
            formik.touched.organization && Boolean(formik.errors.organization)
          }
          helperText={
            (formik.touched.organization && formik.errors.organization) || ' '
          }
          value={formik.values.organization}
          onChange={formik.handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={6}>
        <TextField
          variant="outlined"
          id="website"
          label="Website *"
          error={formik.touched.website && Boolean(formik.errors.website)}
          helperText={(formik.touched.website && formik.errors.website) || ' '}
          value={formik.values.website}
          onChange={formik.handleChange}
          fullWidth
        />
      </Grid>

      <Grid item xs={6}>
        <DatePicker
          id="deadline"
          label="Deadline *"
          error={formik.touched.deadline && Boolean(formik.errors.deadline)}
          helperText={
            (formik.touched.deadline && formik.errors.deadline) || ' '
          }
          value={formik.values.deadline}
          onChange={(date) => formik.setFieldValue('deadline', date, true)}
        />
      </Grid>

      <Grid item>
        <ScholarshipAmountField
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
      </Grid>

      <Grid item xs={12}>
        <TextField
          variant="outlined"
          id="description"
          label="Description *"
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={
            (formik.touched.description && formik.errors.description) || ' '
          }
          value={formik.values.description}
          onChange={formik.handleChange}
          fullWidth
          multiline
          rows={8}
        />
      </Grid>
    </Grid>
  );

  stepperItems.Requirements = 'requirements';
  stepperItems.Tags = 'tags';

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {Object.keys(stepperItems).map((key) => (
          <Step key={key}>
            <StepLabel>{key}</StepLabel>
            <StepContent>
              {stepperItems[key]}
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prevStep) => prevStep - 1)}>
                  BACK
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setActiveStep((prevStep) => prevStep + 1)}>
                  NEXT
                </Button>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
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
  setSubmissionAlert: PropTypes.func,
};
ScholarshipForm.defaultProps = {
  setSubmissionAlert: undefined,
};

export default ScholarshipForm;
