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

const labelStyle = { marginBottom: 2 };

function ScholarshipForm({ scholarship }) {
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

  const stepperItems = {
    General: {
      description: 'Please add the general information about the scholarship.',
      content: (
        <Grid container spacing={3}>
          <Grid item sm={6} xs={12}>
            <FormikTextField
              label="Scholarship Name *"
              id="name"
              formik={formik}
              labelStyle={labelStyle}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <FormikTextField
              label="Organization"
              id="organization"
              formik={formik}
              labelStyle={labelStyle}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <FormikTextField
              label="Scholarship Link *"
              id="website"
              formik={formik}
              labelStyle={labelStyle}
            />
          </Grid>

          <Grid item sm={6}>
            <DatePicker
              label="Deadline *"
              labelStyle={labelStyle}
              formik={formik}
            />
          </Grid>

          <Grid item>
            <ScholarshipAmountField formik={formik} labelStyle={labelStyle} />
          </Grid>

          <Grid item xs={12}>
            <FormikTextField
              label="Description *"
              id="description"
              labelStyle={labelStyle}
              formik={formik}
              minRows={8}
            />
          </Grid>
        </Grid>
      ),
    },
    'Eligibility Requirements': {
      description:
        'Include information that is required for applicants to have.',
      content: (
        <Grid container spacing={3}>
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
              labelStyle={labelStyle}
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
              labelStyle={labelStyle}
              placeholder="None"
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <FormikAutocomplete
              disabled={noReqsChecked}
              label="School(s)"
              id="requirements.schools"
              labelStyle={labelStyle}
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
              labelStyle={labelStyle}
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
              labelStyle={labelStyle}
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
              labelStyle={labelStyle}
              formik={formik}
              options={Ethnicity.values()}
              placeholder="No ethnicity requirements"
            />
          </Grid>
        </Grid>
      ),
    },
    Review: {
      description: 'Please review the information below.',
      content: (
        <ScholarshipDetailCard scholarship={{ data: formik.values }} preview />
      ),
    },
  };

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
        {Object.entries(stepperItems).map(
          ([label, { description, content }]) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{description}</Typography>
                <Box marginY={3}>{content}</Box>
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
              </StepContent>
            </Step>
          )
        )}
      </Stepper>
    </form>
  );
}

ScholarshipForm.propTypes = {
  scholarship: PropTypes.object.isRequired,
};

export default ScholarshipForm;
