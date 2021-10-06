import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Grid,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
import experiments from '../lib/experiments';

const gradeOptions = {
  'Middle School': GradeLevel.MiddleSchool,
  'HS Freshman': GradeLevel.HsFreshman,
  'HS Sophomore': GradeLevel.HsSophomore,
  'HS Junior': GradeLevel.HsJunior,
  'HS Senior': GradeLevel.HsSenior,
  'College Freshman': GradeLevel.CollegeFreshman,
  'College Sophomore': GradeLevel.CollegeSophomore,
  'College Junior': GradeLevel.CollegeJunior,
  'College Senior': GradeLevel.CollegeSenior,
};

const ethnicityOptions = {
  'American Indian or Alaska Native': Ethnicity.AmericanIndianOrAlaskaNative,
  Asian: Ethnicity.Asian,
  'Black or African American': Ethnicity.BlackOrAfricanAmerican,
  'Hispanic or Latino': Ethnicity.HispanicOrLatino,
  'Native Hawaiian or Other Pacific Islander':
    Ethnicity.NativeHawaiianOrOtherPacificIslander,
  White: Ethnicity.White,
};

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

function ScholarshipForm({ scholarship, submitFn, onSubmitError }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [noReqsChecked, setNoReqsChecked] = useState(false);

  // const [noReqsHelperText, setNoReqsHelperText] = useState('');

  const formik = useFormik({
    initialValues: scholarship.data,
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      scholarship.data = { ...values };

      if (noReqsChecked) {
        Object.keys(scholarship.data.requirements).forEach(
          (k) => (scholarship.data.requirements[k] = [])
        );
        scholarship.data.requirements.gpa = 0;
      }

      scholarship
        .save()
        .then(submitFn)
        .then(resetForm)
        .catch(onSubmitError)
        .finally(() => setSubmitting(false));
    },
  });

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

  if (experiments.expShowRequirementsSection) {
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
                onChange={(event) => setNoReqsChecked(event.target.checked)}
                color="primary"
              />
            }
            label="NO ELIGIBILITY REQUIREMENTS"
          />
          <FormHelperText error>{error}</FormHelperText>
        </Grid>

        <Grid item sm={6} xs={12}>
          <FormikMultiSelect
            disabled={noReqsChecked}
            label="Grade(s)"
            id="grades"
            labelStyle={classes.inputLabel}
            formik={formik}
            options={gradeOptions}
            placeholder="No grade requirements"
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <FormikTextField
            disabled={noReqsChecked}
            label="Minimum GPA"
            id="gpa"
            formik={formik}
            labelStyle={classes.inputLabel}
          />
        </Grid>

        <Grid item sm={6} xs={12}>
          <FormikAutocomplete
            disabled={noReqsChecked}
            label="School(s)"
            id="schools"
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
            id="states"
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
            id="majors"
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
            id="ethnicities"
            labelStyle={classes.inputLabel}
            formik={formik}
            options={ethnicityOptions}
            placeholder="No ethnicity requirements"
          />
        </Grid>
      </Grid>
    );
  }
  /*
  function validationCheck() {
    // no requirements and checkbox not checked
    if (
      !Object.values(formik.values.requirements).some((val) => {
        if (typeof val == 'number') return val != 0;
        return val.length != 0;
      }) &&
      !noReqsChecked
    ) {
      setNoReqsHelperText(
        'Check this box if there are no requirements for this scholarship.'
      );
      return;
    }
    setNoReqsHelperText('');
    formik.submitForm();
  } */

  stepperItems.Review = (
    <Box className={classes.reviewSection}>
      <ScholarshipDetailCard scholarship={{ data: formik.values }} preview />
    </Box>
  );

  const onLastStep = activeStep == Object.keys(stepperItems).length - 1;

  return (
    <form>
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
                      if (Object.keys(errors).length === 0)
                        return setActiveStep((prevStep) => prevStep + 1);
                      return formik.setErrors(errors);
                    });
                  }}>
                  {onLastStep ? 'Submit' : 'Next'}
                </Button>
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
