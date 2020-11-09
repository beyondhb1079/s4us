import React, { useState } from 'react';
import { Container, Button, TextField, Snackbar } from '@material-ui/core';
import EnumSelectField from '../components/EnumSelectField';
import ScholarshipType from '../types/ScholarshipType';
import DatePicker from '../components/DatePicker';

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
        <EnumSelectField
          id="scholarshipType"
          label="Scholarship Type"
          value={formFieldStates.scholarshipType}
          onChange={updateFn('scholarshipType')}
          enums={ScholarshipType}
        />
        <div>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open
        message="TODO: write form submission logic."
      />
    </Container>
  );
}
export default ScholarshipForm;
