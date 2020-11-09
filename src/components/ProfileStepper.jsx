import React from 'react';
import { Redirect } from 'react-router-dom';

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
import ProfileForm from './ProfileForm';

function createFormControl(name) {
  return <FormControlLabel value={name} control={<Radio />} label={name} />;
}

export default function ProfileStepper() {
  const [currentUser, setCurrentUser] = React.useState('');
  const handleCurrentUser = (event) => {
    setCurrentUser(event.target.value);
  };

  const steps = {
    0: {
      title: 'Profile Selection',
      content: 'Please Select Profile Type',
      task: (
        <FormControl component="fieldset">
          <FormLabel component="legend">Account Type</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={currentUser}
            onChange={handleCurrentUser}>
            {createFormControl('Student')}
            {createFormControl('Parent')}
            {createFormControl('Community Contributor')}
          </RadioGroup>
        </FormControl>
      ),
    },
    1: {
      title: 'Profile Information',
      content: null,
      task: <ProfileForm />,
    },
    2: {
      title: 'Completed',
      content: null,
      task: null,
    },
  };

  function getSteps() {
    // returns an array to be able to map on stepper
    return [steps[0].title, steps[1].title, steps[2].title];
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        style={{ backgroundColor: 'transparent' }}>
        {getSteps().map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{steps[index].content}</Typography>
              {steps[index].task}
              <div>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}>
                  {activeStep === 2 ? 'Create Account' : 'Next Step'}
                </Button>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === 3 && <Redirect to="/home" />}
      {currentUser === 'Community Contributor' && <Redirect to="/home" />}
    </div>
  );
}
