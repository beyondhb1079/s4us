import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ScholarshipForm from './ScholarshipForm';

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
  return ['Step One', 'Step Two', 'Step Three'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Provide us with the scholarship details in Step Two and we will ensure to add the scholarship to our database. We appreciate your contribution!';
    case 1:
      return 'Please Provide Scholarship Details Below :]';
    case 2:
      return 'To complete the submission of the scholarship click on the Submit button. We would love to have you on our team as a moderator! If you are intrested once you submit click on the button Join Team to learn more.';
    default:
      return 'Unknown step';
  }
}

function getStepTask(step) {
  switch (step) {
    case 0:
      return null;
    case 1:
      return <ScholarshipForm />;
    case 2:
      return <h4>**Have yet to implement or even figure out how this can be presented</h4>;
    case 3:
      return null;
    default:
      return 'Unknown step';
  }
}

export default function OrganizationStepper() {
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
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished. Thank you very much for your scholarship contribution and time, we look forward to connecting with you!
            </Typography>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>{getStepTask(activeStep)}</div>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
