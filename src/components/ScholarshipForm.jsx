import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  FormHelperText,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';
import validationSchema from '../validation/ValidationSchema';
import ScholarshipAmountField from './ScholarshipAmountField';
import DatePicker from './DatePicker';
import FormikTextField from './FormikTextField';
import ScholarshipDetailCard from './ScholarshipDetailCard';
import FormikMultiSelect from './FormikMultiSelect';
import FormikAutocomplete from './FormikAutocomplete';
import { SCHOOLS, STATES, MAJORS } from '../types/options';
import GradeLevel from '../types/GradeLevel';
import Ethnicity from '../types/Ethnicity';

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
  reviewSection: {
    marginTop: theme.spacing(2),
  },
}));

function ScholarshipForm({ scholarship }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [submissionError, setSubmissionError] = useState(null);
  const history = useHistory();

  const formik = useFormik({
    initialValues: scholarship.data,
    validationSchema,
    validateOnChange: false,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      scholarship.data = { ...values };
      scholarship
        .save()
        .then((s) =>
          history.push({
            pathname: `/scholarships/${s.id}`,
            state: { alert: {} },
          })
        )
        .catch(setSubmissionError)
        .finally(() => setSubmitting(false));
    },
  });

  // Initially requirements is null but is set to {} when the "no requirements"
  // checkbox is explicitly set.
  const noReqsChecked = JSON.stringify(formik.values.requirements) === '{}';

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
          label="Deadline *"
          labelStyle={classes.inputLabel}
          formik={formik}
        />
      </Grid>

      <Grid item>
        <ScholarshipAmountField
          formik={formik}
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
              checked={noReqsChecked}
              onChange={() =>
                formik.setFieldValue(
                  'requirements',
                  noReqsChecked ? undefined : {}
                )
              }
              color="primary"
            />
          }
          label="NO ELIGIBILITY REQUIREMENTS"
        />
        <FormHelperText error>{formik.errors.checkbox}</FormHelperText>
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormikMultiSelect
          disabled={noReqsChecked}
          label="Grade(s)"
          id="requirements.grades"
          labelStyle={classes.inputLabel}
          formik={formik}
          options={GradeLevel.values()}
          placeholder="No grade requirements"
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormikTextField
          id="requirements.gpa"
          type="number"
          disabled={noReqsChecked}
          formik={formik}
          label="Minimum GPA"
          labelStyle={classes.inputLabel}
          placeholder="None"
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormikAutocomplete
          disabled={noReqsChecked}
          label="School(s)"
          id="requirements.schools"
          labelStyle={classes.inputLabel}
          options={[...SCHOOLS]}
          freeSolo
          formik={formik}
          placeholder="No school requirements"
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormikAutocomplete
          disabled={noReqsChecked}
          label="State(s)"
          id="requirements.states"
          labelStyle={classes.inputLabel}
          options={STATES}
          formik={formik}
          placeholder="No state requirements"
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormikAutocomplete
          disabled={noReqsChecked}
          label="Major(s)"
          id="requirements.majors"
          labelStyle={classes.inputLabel}
          options={[...MAJORS]}
          freeSolo
          formik={formik}
          placeholder="No major requirements"
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormikMultiSelect
          disabled={noReqsChecked}
          label="Ethnicity(s)"
          id="requirements.ethnicities"
          labelStyle={classes.inputLabel}
          formik={formik}
          options={Ethnicity.values()}
          placeholder="No ethnicity requirements"
        />
      </Grid>
    </Grid>
  );

  stepperItems.Review = (
    <Box className={classes.reviewSection}>
      <ScholarshipDetailCard scholarship={{ data: formik.values }} preview />
    </Box>
  );

  function validationCheck() {
    const noReqsGiven =
      !formik.values.requirements ||
      Object.values(formik.values.requirements).every(
        (val) => val == [] || val == ''
      );
    // no requirements & no checkbox fails
    if (activeStep == 1 && !noReqsChecked && noReqsGiven)
      return 'Check this box if there are no requirements for this scholarship.';

    return '';
  }

  const onLastStep = activeStep == Object.keys(stepperItems).length - 1;

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

                <Button
                  key={activeStep}
                  variant="contained"
                  color="primary"
                  disabled={formik.isSubmitting}
                  type={onLastStep ? 'submit' : 'button'}
                  onClick={() => {
                    if (onLastStep) return;
                    formik.validateForm().then((errors) => {
                      const checkboxError = validationCheck();
                      if (checkboxError)
                        errors = { ...errors, checkbox: checkboxError };

                      if (Object.keys(errors).length === 0)
                        setActiveStep((prevStep) => prevStep + 1);

                      return formik.setErrors(errors);
                    });
                  }}>
                  {onLastStep ? 'Submit' : 'Next'}
                </Button>
                {submissionError && (
                  <Alert
                    severity="error"
                    onClose={() => setSubmissionError(null)}>
                    <AlertTitle>
                      There was an error submitting your changes:
                    </AlertTitle>
                    {submissionError.toString()}
                  </Alert>
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
};

export default ScholarshipForm;
