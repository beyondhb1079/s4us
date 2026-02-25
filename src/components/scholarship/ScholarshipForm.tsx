import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  Theme,
} from '@mui/material';
import validationSchema from '../../validation/ValidationSchema';
import ScholarshipCard from './ScholarshipCard';
import useOptionsData from '../../lib/useOptionsData';
import { lintReqs, LintReqsResult } from '../../lib/lint';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';
import i18n from 'i18next';
import ScholarshipData from '../../types/ScholarshipData';
import Model from '../../models/base/Model';
import ScholarshipEligibility from '../../types/ScholarshipEligibility';
import GeneralInfoStep from './scholarship-form/GeneralInfoStep';
import EligibilityStep from './scholarship-form/EligibilityStep';

interface SFProps {
  scholarship: Model<ScholarshipData>;
}

export default function ScholarshipForm({
  scholarship,
}: SFProps): React.JSX.Element {
  const [activeStep, setActiveStep] = useState(0);
  const [submissionError, setSubmissionError] = useState(null as null | Error);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { majors: allMajors, schools: allSchools } = useOptionsData();

  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const { t: validationT } = useTranslation('validation');
  const { t } = useTranslation(['scholarships', 'common']);

  const formik = useFormik({
    initialValues: scholarship.data,
    validationSchema: validationSchema(validationT),
    validateOnChange: false,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      scholarship.data = { ...values };
      scholarship
        .save()
        .then((s) => {
          queryClient.invalidateQueries({ queryKey: ['scholarships'] });
          navigate(`/scholarships/${s.id}`, {
            state: {
              prevPath: location.pathname,
              scholarship: { id: s.id, data: s.data },
            },
          });
        })
        .catch(setSubmissionError)
        .finally(() => setSubmitting(false));
    },
  });

  i18n.on('languageChanged', () => formik.setErrors({}));

  const lintIssues: LintReqsResult =
    activeStep === 1
      ? lintReqs(formik.values, allMajors, allSchools)
      : { messages: [], reqs: {} };
  const autoFill = () => {
    const vals = formik.values.requirements;
    const lintVals = lintIssues.reqs;
    const updatedReqs: ScholarshipEligibility = {};

    const grades = [...(vals?.grades || []), ...(lintVals?.grades || [])];
    const schools = [...(vals?.schools || []), ...(lintVals?.schools || [])];
    const states = [...(vals?.states || []), ...(lintVals?.states || [])];
    const majors = [...(vals?.majors || []), ...(lintVals?.majors || [])];
    const ethnicities = [
      ...(vals?.ethnicities || []),
      ...(lintVals?.ethnicities || []),
    ];

    if (lintIssues.reqs.gpa) updatedReqs.gpa = lintVals.gpa;
    if (grades.length) updatedReqs.grades = grades;
    if (schools.length) updatedReqs.schools = schools;
    if (states.length) updatedReqs.states = states;
    if (majors.length) updatedReqs.majors = majors;
    if (ethnicities.length) updatedReqs.ethnicities = ethnicities;

    formik.setFieldValue('requirements', updatedReqs);
  };

  // Initially requirements is null but is set to {} when the "no requirements"
  // checkbox is explicitly set.
  const noReqsChecked = JSON.stringify(formik.values.requirements) === '{}';

  const stepperItems = {
    [t('common:general')]: {
      description: t('generalDescription'),
      content: <GeneralInfoStep formik={formik} />,
    },
    [t('eligibilityReqs')]: {
      description: t('requirementsDescription'),
      content: (
        <EligibilityStep
          formik={formik}
          lintIssues={lintIssues}
          allMajors={allMajors}
          allSchools={allSchools}
          autoFill={autoFill}
        />
      ),
    },
    [t('common:review')]: {
      description: isDesktop ? t('reviewOnRight') : t('reviewBelow'),
      content: !isDesktop && (
        <ScholarshipCard
          scholarship={{ data: formik.values }}
          style="preview"
        />
      ),
    },
  };

  function validationCheck() {
    const noReqsGiven =
      !formik.values.requirements ||
      Object.values(formik.values.requirements).every(
        (val) => (Array.isArray(val) && val.length === 0) || val === '',
      );
    // no requirements & no checkbox fails
    if (activeStep === 1 && !noReqsChecked && noReqsGiven)
      return validationT('checkboxValid');

    return '';
  }

  const onLastStep = activeStep === Object.keys(stepperItems).length - 1;

  return (
    <Box
      sx={{
        display: isDesktop ? 'flex' : 'block',
        alignItems: 'flex-start',
      }}>
      <Paper
        elevation={2}
        sx={{
          p: { xs: 2, sm: 3 },
          width: isDesktop ? '50%' : '100%',
          mr: 2,
        }}>
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
                      {t('common:actions.back')}
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
                            errors = { ...errors, requirements: checkboxError };

                          if (Object.keys(errors).length === 0)
                            setActiveStep((prevStep) => prevStep + 1);

                          return formik.setErrors(errors);
                        });
                      }}>
                      {onLastStep
                        ? t('common:actions.submit')
                        : t('common:actions.next')}
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
              ),
            )}
          </Stepper>
        </form>
      </Paper>

      <Box sx={{ width: '50%' }}>
        {isDesktop && (
          <ScholarshipCard
            scholarship={{ data: formik.values }}
            style="preview"
          />
        )}
      </Box>
    </Box>
  );
}
