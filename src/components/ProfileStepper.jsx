import React from 'react';
import { Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
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
  return ['Profile Selection', 'Profile Information', 'Completed'];
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

export default function ProfileStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const [daca, setDaca] = React.useState('');
  const handleDacaChange = (event) => {
    setDaca(event.target.value);
  };

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepTask(step) {
    switch (step) {
      case 0:
        return (
          <div>
            <FormControl component="fieldset">
              <FormLabel component="legend">Type</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" value={daca} onChange={handleDacaChange}>
                <FormControlLabel value="Student" control={<Radio />} label="Student" />
                <FormControlLabel value="Contributor" control={<Radio />} label="Community Contributor" />
                <FormControlLabel value="Parent" control={<Radio />} label="Parent" />
              </RadioGroup>
            </FormControl>
          </div>
        );
      case 1:
        if (daca === 'Contributor') {
          return <h2>Please continue on to the next step</h2>;
        }
        return <ProfileInput />;

      case 2:
        return null;
      case 3:
        return null;
      default:
        return 'Unknown step';
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              {getStepTask(index)}
              <div className={classes.actionsContainer}>
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                  {activeStep === 2 ? 'Complete' : 'Next'}
                </Button>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === 3 && (<Redirect to="/scholarships" />)}
    </div>
  );
}
