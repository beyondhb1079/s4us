import React, { useState } from 'react';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ProfileInput from './ProfileForm';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Login', 'Profile Information', 'Scholarship Details'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Please login to continue to the next step';
    case 1:
      return null;
    case 2:
      return null;
    default:
      return 'Unknown step';
  }
}

function getStepTask(step) {
  switch (step) {
    case 0:
      return null;
    case 1:
      return <ProfileInput />;
    case 2:
      return null;
    case 3:
      return null;
    default:
      return 'Unknown step';
  }
}

export default function ProfileStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isSignedIn, setIsSignedIn] = useState(!!firebase.auth().currentUser);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
      setActiveStep(0);
    }
  });

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (

    <div className={classes.root}>
      <Stepper activeStep={isSignedIn ? activeStep + 1 : activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div>{getStepTask(index)}</div>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button disabled={index === 0} variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                    {activeStep === 1 ? 'Complete' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {
        activeStep === 2 && (
          <Redirect to="/scholarships" />
        )
      }
    </div>
  );
}
