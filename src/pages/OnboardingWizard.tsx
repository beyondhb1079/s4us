import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../lib/useAuth';
import {
  Box,
  Typography,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as yup from 'yup';

import GradeStep from '../components/onboarding/GradeStep';
import StateStep from '../components/onboarding/StateStep';
import MajorStep from '../components/onboarding/MajorStep';
import EthnicityStep from '../components/onboarding/EthnicityStep';

const steps = ['Education Level', 'Location', 'Field of Study', 'Demographics'];

interface OnboardingValues {
  grades: number[];
  states: string[];
  majors: string[];
  ethnicities: string[];
}

const initialValues: OnboardingValues = {
  grades: [],
  states: [],
  majors: [],
  ethnicities: [],
};

const validationSchema = yup.object({
  grades: yup.array().of(yup.number()),
  states: yup.array().of(yup.string()),
  majors: yup.array().of(yup.string()),
  ethnicities: yup.array().of(yup.string()),
});

export default function OnboardingWizard() {
  const [activeStep, setActiveStep] = useState(0);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async (
    values: OnboardingValues,
    actions: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    if (isLastStep) {
      if (!currentUser) {
        console.error('User must be logged in to save preferences.');
        actions.setSubmitting(false);
        return;
      }

      try {
        const { getFirestore, doc, setDoc } =
          await import('firebase/firestore');
        const db = getFirestore();
        await setDoc(
          doc(db, 'users', currentUser.uid),
          { preferences: values },
          { merge: true },
        );
        console.log('Final values submitted: ', values);
        navigate('/scholarships');
      } catch (e) {
        console.error('Error saving onboarding data: ', e);
      }
    } else {
      handleNext();
      actions.setSubmitting(false);
    }
  };

  function _renderStepContent(step: number) {
    switch (step) {
      case 0:
        return <GradeStep />;
      case 1:
        return <StateStep />;
      case 2:
        return <MajorStep />;
      case 3:
        return <EthnicityStep />;
      default:
        return <div>Not Found</div>;
    }
  }

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Build Your Profile
        </Typography>
        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          sx={{ mb: 4 }}>
          Tell us about yourself to unlock a personalized scholarship feed!
        </Typography>

        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              {_renderStepContent(activeStep)}

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  sx={{ mt: 3, ml: 1 }}>
                  {isSubmitting ? (
                    <CircularProgress size={24} />
                  ) : isLastStep ? (
                    'Finish'
                  ) : (
                    'Next'
                  )}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}
