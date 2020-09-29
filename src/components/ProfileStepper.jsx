import React from 'react';
import { Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ProfileInput from './ProfileForm';
import ProfileSelection from './ProfileSelection';

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
  return ['Profile Selection', 'Profile Information', 'Scholarship Details'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Please Select Profile Type';
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
      return <ProfileSelection />;
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

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  return (

    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
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
                  <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                    {activeStep === 2 ? 'Complete' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {
        activeStep === 3 && (
          <Redirect to="/scholarships" />
        )
      }
    </div>
  );
}
