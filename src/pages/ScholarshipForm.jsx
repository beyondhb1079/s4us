import React, { useState } from 'react';
import { Container, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ScholarshipAmountField from '../components/ScholarshipAmountField';
import DatePicker from '../components/DatePicker';
import { invalidAmountFields } from '../validation/amountValidation';

const useStyles = makeStyles({
  containerStyle: {
    maxWidth: 400,
  },
});

// regular expression used for valid website urls
const websiteReg = /^(http(s)?:\/\/(www\.)?)?[\w-]+(\.[\w-]+)*\.[a-z]{2,}((\/|#|\?)(\S)*)?$/;

function ScholarshipForm() {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: '',
    deadline: null,
    description: '',
    amountType: null,
    minAmount: 0,
    maxAmount: 0,
    website: '',
    scholarshipType: '',
  });

  const [errors, setErrors] = useState({});

  function validateForm() {
    /* eslint-disable no-restricted-globals */
    setErrors({
      name: !values.name,
      deadline: !values.deadline || isNaN(values.deadline),
      description: !values.description,
      website: !websiteReg.test(values.website),
      amountHelperText: invalidAmountFields(
        values.amountType,
        values.minAmount,
        values.maxAmount
      ),
    });
  }

  function updateAmount(minAmount, maxAmount) {
    setValues({ ...values, minAmount, maxAmount });
  }

  return (
    <Container maxWidth="md">
      <form className={classes.containerStyle}>
        <h1>Submit a Scholarship</h1>
        <div>
          <TextField
            id="name"
            label="Scholarship Name"
            error={errors.name}
            helperText={errors.name ? 'Please enter a name' : ' '}
            required
            value={values.name}
            onChange={(e) => setValues({ ...values, name: e.target.value })}
            fullWidth
          />
        </div>
        <DatePicker
          id="deadline"
          label="Deadline"
          error={errors.deadline}
          helperText={(errors.deadline && 'Please enter a valid date') || ' '}
          value={values.deadline}
          onChange={(date) => setValues({ ...values, deadline: date })}
        />
        <div>
          <TextField
            id="description"
            label="Description"
            error={errors.description}
            helperText={errors.description ? 'Please enter a description' : ' '}
            required
            value={values.description}
            onChange={(e) =>
              setValues({ ...values, description: e.target.value })
            }
            fullWidth
          />
        </div>
        <div>
          <TextField
            id="website"
            label="Website"
            error={errors.website}
            helperText={errors.website ? 'Please enter a valid website' : ' '}
            required
            value={values.website}
            onChange={(e) => setValues({ ...values, website: e.target.value })}
            fullWidth
          />
        </div>
        <ScholarshipAmountField
          helperText={errors.amountHelperText}
          amountType={values.amountType}
          minAmount={values.minAmount}
          maxAmount={values.maxAmount}
          onTypeChange={(e) =>
            setValues({ ...values, amountType: e.target.value })
          }
          updateAmount={updateAmount}
        />
        <div>
          <Button variant="contained" color="primary" onClick={validateForm}>
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
}
export default ScholarshipForm;
