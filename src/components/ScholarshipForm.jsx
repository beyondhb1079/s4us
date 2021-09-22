import React, { useState } from 'react';
import { useFormik, getIn } from 'formik';
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  InputLabel,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import validationSchema from '../validation/ValidationSchema';
import ScholarshipAmountField from './ScholarshipAmountField';
import DatePicker from './DatePicker';
import FormikTextField from './FormikTextField';
import AmountType from '../types/AmountType';
import FormikMultiSelect from './FormikMultiSelect';

const gradeOptions = [
  'Middle School',
  'HS Freshman',
  'HS Sophomore',
  'HS Junior',
  'HS Senior',
  'College Freshman',
  'College Sophomore',
  'College Junior',
  'College Senior',
];

const ethnicityOptions = [
  'American Indian or Alaska Native',
  'Asian',
  'Black or African American',
  'Hispanic or Latino',
  'Native Hawaiian or Other Pacific Islander',
  'White',
];

const schoolOptions = [{ title: 'school1' }, { title: 'school2' }];
const stateOptions = [{ title: 'CA' }, { title: 'WA' }];
const majorOptions = [{ title: 'major1' }, { title: 'major2' }];

const useStyles = makeStyles((theme) => ({
  stepperDescription: {
    marginBottom: theme.spacing(2),
  },
  inputLabel: {
    marginBottom: theme.spacing(2),
  },
  stepperBtns: {
    marginTop: theme.spacing(4),
  },
}));

function ScholarshipForm({ scholarship, submitFn, onSubmitError }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [hasReqs, setHasReqs] = useState(false);

  const [grades, setGrades] = useState([]);
  const [ethnicities, setEthnicities] = useState([]);

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

  /* eslint-disable react/jsx-props-no-spreading */
  const stepperItems = {};
  stepperItems.General = (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography className={classes.stepperDescription}>
          Please add the general information about the scholarship.
        </Typography>
      </Grid>

      <Grid item sm={6} xs={12}>
        <FormikTextField
          label="Scholarship Name *"
          id="name"
          formik={formik}
          labelStyle={classes.inputLabel}
        />
      </Grid>

      <Grid item sm={6} xs={12}>
        <FormikTextField
          label="Organization"
          id="organization"
          formik={formik}
          labelStyle={classes.inputLabel}
        />
      </Grid>

      <Grid item sm={6} xs={12}>
        <FormikTextField
          label="Scholarship Link *"
          id="website"
          formik={formik}
          labelStyle={classes.inputLabel}
        />
      </Grid>

      <Grid item sm={6}>
        <DatePicker
          id="deadline"
          label="Deadline *"
          labelStyle={classes.inputLabel}
          error={formik.touched.deadline && Boolean(formik.errors.deadline)}
          helperText={formik.touched.deadline && formik.errors.deadline}
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
            getIn(formik.errors, 'amount.max')
          }
          amountType={formik.values.amount.type ?? AmountType.Unknown}
          minAmount={formik.values.amount.min}
          maxAmount={formik.values.amount.max}
          onTypeChange={(e) =>
            formik.setFieldValue('amount.type', e.target.value, true)
          }
          updateAmount={updateAmount}
          labelStyle={classes.inputLabel}
        />
      </Grid>

      <Grid item xs={12}>
        <FormikTextField
          label="Description *"
          id="description"
          labelStyle={classes.inputLabel}
          formik={formik}
          minRows={8}
        />
      </Grid>
    </Grid>
  );

  stepperItems['Eligibility Requirements'] = (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography className={classes.stepperDescription}>
          Include information that is required for applicants to have.
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={hasReqs}
              onChange={(event) => setHasReqs(event.target.checked)}
              color="primary"
            />
          }
          label="NO ELIGIBILITY REQUIREMENTS"
        />
      </Grid>

      <Grid item sm={6} xs={12}>
        <FormikMultiSelect
          label="Grade"
          labelStyle={classes.inputLabel}
          value={grades}
          options={gradeOptions}
          changeFn={setGrades}
        />
      </Grid>

      <Grid item sm={6} xs={12}>
        <FormikTextField
          label="GPA"
          id="gpa"
          formik={formik}
          labelStyle={classes.inputLabel}
        />
      </Grid>

      <Grid item sm={6} xs={12}>
        <InputLabel className={classes.inputLabel}>School</InputLabel>
        <Autocomplete
          options={schoolOptions}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" fullWidth />
          )}
        />
      </Grid>

      <Grid item sm={6} xs={12}>
        <InputLabel className={classes.inputLabel}>State</InputLabel>
        <Autocomplete
          options={stateOptions}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" fullWidth />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <InputLabel className={classes.inputLabel}>Major</InputLabel>
        <Autocomplete
          options={majorOptions}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField {...params} variant="outlined" fullWidth />
          )}
        />
      </Grid>

      <Grid item xs={6}>
        <FormikMultiSelect
          label="Ethnicity"
          labelStyle={classes.inputLabel}
          value={ethnicities}
          changeFn={setEthnicities}
          options={ethnicityOptions}
        />
      </Grid>
    </Grid>
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {Object.keys(stepperItems).map((key) => (
          <Step key={key}>
            <StepLabel>{key}</StepLabel>
            <StepContent>
              {stepperItems[key]}
              <div className={classes.stepperBtns}>
                <Button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prevStep) => prevStep - 1)}>
                  BACK
                </Button>
                {activeStep == Object.keys(stepperItems).length - 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={formik.isSubmitting}>
                    Submit
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setActiveStep((prevStep) => prevStep + 1)}>
                    NEXT
                  </Button>
                )}
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </form>
  );
}

ScholarshipForm.propTypes = {
  scholarship: PropTypes.object.isRequired,
  submitFn: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
};

export default ScholarshipForm;
