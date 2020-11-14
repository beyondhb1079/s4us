import React, { useState } from 'react';
import { Container, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ScholarshipAmountField from '../components/ScholarshipAmountField';
import DatePicker from '../components/DatePicker';

const useStyles = makeStyles({
  textFieldStyle: {
    minWidth: 400,
  },
});

// regular expression used for valid website urls
const websiteReg = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
let amountHelperText = '';

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

  // returns true if amount is invalid
  function invalidAmountFields() {
    const min = formFieldStates.minAmount;
    const max = formFieldStates.maxAmount;

    // true if amount less than 0 or not an integer
    const err1 = min <= 0 || Number(min) % 1 !== 0;
    const err2 = max <= 0 || Number(max) % 1 !== 0;

    if (formFieldStates.amountType === 'FIXED') {
      amountHelperText = err1 && 'Please input a valid number';
      return { minAmountError: err1, maxAmountError: false };
    }

    if (formFieldStates.amountType === 'RANGE') {
      // both fields are filled
      if (min && max) {
        // either is not an integer > 0
        if (err1 || err2) {
          amountHelperText = 'Please input a valid number or leave blank';
          return { minAmountError: err1, maxAmountError: err2 };
        }
        // both are valid numbers
        if (!err1 && !err2) {
          const minError = Number(min) >= Number(max);
          amountHelperText =
            minError && 'Minimum amount must be less than the maximum amount';
          return { minAmountError: minError, maxAmountError: err2 };
        }
      }

      // either field is filled
      if (min || max) {
        amountHelperText = (min || max) && 'Please input a valid number';
        if (min && !max) return { minAmountError: err1, maxAmountError: false };
        return { minAmountError: false, maxAmountError: err2 };
      }
      amountHelperText =
        'Please input a valid number in at least one of the fields';
      return { minAmountError: err1, maxAmountError: err2 };
    }

    return { minAmountError: false, maxAmountError: false };
  }

  function validateFields() {
    const nameError = !formFieldStates.name;
    /* eslint-disable no-restricted-globals */
    const deadlineError =
      !formFieldStates.deadline || isNaN(formFieldStates.deadline); // checks if deadline is invalid date
    const descriptionError = !formFieldStates.description;
    const websiteError = !websiteReg.test(formFieldStates.website);
    const amountTypeError = !formFieldStates.amountType;
    amountHelperText = amountTypeError && 'Please choose an option above';

    const { minAmountError, maxAmountError } = invalidAmountFields();

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
        className={classes.textFieldStyle}
        {...{ id, label, error, multiline }}
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
