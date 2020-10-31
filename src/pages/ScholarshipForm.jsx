import React, { useState } from 'react';
import { Container, Button, TextField } from '@material-ui/core';
import ScholarshipAmountField from '../components/ScholarshipAmountField';
import DatePicker from '../components/DatePicker';

function ScholarshipForm() {
  const [formFieldStates, setFormFieldStates] = useState({
    name: '',
    deadline: new Date(),
    description: '',
    amountType: '',
    minAmount: 0,
    maxAmount: 0,
    website: '',
    scholarshipType: '',
    active: false,
  });

  function updateFn(id) {
    return (e) =>
      setFormFieldStates({ ...formFieldStates, [id]: e.target.value });
  }
  function updateMinMax(value) {
    setFormFieldStates({
      ...formFieldStates,
      minAmount: value,
      maxAmount: value,
    });
  }
  function updateAmount(id) {
    return (e) =>
      setFormFieldStates({
        ...formFieldStates,
        [id]: parseInt(e.target.value, 10) || '',
      });
  }
  function requiredTextField(id, label) {
    return (
      <TextField
        id={id}
        label={label}
        required
        fullWidth
        value={formFieldStates[id]}
        onChange={updateFn(id)}
      />
    );
  }

  return (
    <Container maxWidth="md">
      <form>
        <h1>Submit a Scholarship</h1>
        {requiredTextField('name', 'Scholarship Name')}
        <DatePicker
          id="deadline"
          label="Deadline"
          value={formFieldStates.deadline}
          onChange={(date) =>
            setFormFieldStates({ ...formFieldStates, deadline: date })
          }
        />
        {requiredTextField('description', 'Description')}
        {requiredTextField('website', 'Website')}
        <ScholarshipAmountField
          amountType={formFieldStates.amountType}
          minAmount={formFieldStates.minAmount}
          maxAmount={formFieldStates.maxAmount}
          onTypeChange={updateFn('amountType')}
          onMinChange={updateAmount('minAmount')}
          onMaxChange={updateAmount('maxAmount')}
          updateMinMax={updateMinMax}
        />
        <div>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
}
export default ScholarshipForm;
