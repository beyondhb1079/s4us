import React, { useState } from 'react';
import { Container, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ScholarshipAmountField from '../components/ScholarshipAmountField';
import DatePicker from '../components/DatePicker';
import { invalidAmountFields } from '../validation/amountValidation';

const useStyles = makeStyles({
  textFieldStyle: {
    minWidth: 400,
  },
});

// regular expression used for valid website urls
const websiteReg = /^(http(s)?:\/\/(www\.)?)?[\w-]+(\.[\w-]+)*\.[a-z]{2,}((\/|#|\?)(\S)*)?$/;

function ScholarshipForm() {
  const classes = useStyles();
  const [formFieldStates, setFormFieldStates] = useState({
    name: '',
    deadline: null,
    description: '',
    amountType: null,
    minAmount: '',
    maxAmount: '',
    website: '',
    scholarshipType: '',
  });

  const [formFieldErrors, setFormFieldErrors] = useState({
    name: false,
    deadline: false,
    description: false,
    amountType: false,
    website: false,
    minAmount: false,
    maxAmount: false,
  });
  const [amountHelperText, setAmountHelperText] = useState(
    'Please choose an option above.'
  );

  function validateFields() {
    const nameError = !formFieldStates.name;
    /* eslint-disable no-restricted-globals */
    const deadlineError =
      !formFieldStates.deadline || isNaN(formFieldStates.deadline); // checks if deadline is invalid date
    const descriptionError = !formFieldStates.description;
    const websiteError = !websiteReg.test(formFieldStates.website);
    const amountTypeError = !formFieldStates.amountType;

    const { minAmountError, maxAmountError } = invalidAmountFields(
      formFieldStates.amountType,
      formFieldStates.minAmount,
      formFieldStates.maxAmount,
      (message) => {
        setAmountHelperText(message);
      }
    );

    setFormFieldErrors({
      ...formFieldErrors,
      name: nameError,
      deadline: deadlineError,
      description: descriptionError,
      website: websiteError,
      amountType: amountTypeError,
      minAmount: minAmountError,
      maxAmount: maxAmountError,
    });
  }

  function updateFn(id) {
    return (e) =>
      setFormFieldStates({ ...formFieldStates, [id]: e.target.value });
  }

  function updateAmount(minAmount, maxAmount) {
    setFormFieldStates({ ...formFieldStates, minAmount, maxAmount });
  }

  function requiredTextField(id, label, error, helperText, multiline = false) {
    return (
      <TextField
        {...{ id, label, error, multiline }}
        className={classes.textFieldStyle}
        helperText={error && helperText}
        required
        value={formFieldStates[id]}
        onChange={updateFn(id)}
      />
    );
  }

  return (
    <Container maxWidth="md">
      <form>
        <h1>Submit a Scholarship</h1>
        <div>
          {requiredTextField(
            'name',
            'Scholarship Name',
            formFieldErrors.name,
            'Please enter a name'
          )}
        </div>
        <DatePicker
          id="deadline"
          label="Deadline"
          error={formFieldErrors.deadline}
          helperText="Please enter a valid date"
          value={formFieldStates.deadline}
          onChange={(date) =>
            setFormFieldStates({ ...formFieldStates, deadline: date })
          }
        />
        <div>
          {requiredTextField(
            'description',
            'Description',
            formFieldErrors.description,
            'Please enter a description',
            true
          )}
        </div>
        <div>
          {requiredTextField(
            'website',
            'Website',
            formFieldErrors.website,
            'Please enter a valid website'
          )}
        </div>
        <ScholarshipAmountField
          typeError={formFieldErrors.amountType}
          minAmountError={formFieldErrors.minAmount}
          maxAmountError={formFieldErrors.maxAmount}
          helperText={amountHelperText}
          amountType={formFieldStates.amountType}
          minAmount={formFieldStates.minAmount}
          maxAmount={formFieldStates.maxAmount}
          onTypeChange={updateFn('amountType')}
          updateAmount={updateAmount}
        />
        <div>
          <Button variant="contained" color="primary" onClick={validateFields}>
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
}
export default ScholarshipForm;
