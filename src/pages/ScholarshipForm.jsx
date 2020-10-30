import React, { useState } from 'react';
import { Container, Button, TextField } from '@material-ui/core';
import ScholarshipAmountField from '../components/ScholarshipAmountField';
import AmountType from '../types/AmountType';

function ScholarshipForm() {
  const [formFieldStates, setFormFieldStates] = useState({
    name: '',
    deadline: new Date(),
    description: '',
    amountType: '',
    amount: 0,
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
  function requiredTextField(id, label) {
    return (
      <TextField
        id={id}
        label={label}
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
        {requiredTextField('name', 'Scholarship Name')}
        {requiredTextField('description', 'Description')}
        {requiredTextField('website', 'Website')}
        <ScholarshipAmountField label="Award Type" amountTypes={AmountType} />
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
}
export default ScholarshipForm;
