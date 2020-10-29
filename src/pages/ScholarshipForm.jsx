import React, { useState } from 'react';
import { Container, Button, TextField } from '@material-ui/core';
import EnumSelectField from '../components/EnumSelectField';
import ScholarshipType from '../types/ScholarshipType';

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
        {requiredTextField('description', 'Description')}
        {requiredTextField('website', 'Website')}
        <EnumSelectField
          id="scholarshipType"
          label="Scholarship Type"
          value={formFieldStates.scholarshipType}
          onChange={updateFn('scholarshipType')}
          enums={ScholarshipType}
        />
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log(formFieldStates)}>
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
}
export default ScholarshipForm;
