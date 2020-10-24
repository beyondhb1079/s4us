import React, { useState } from 'react';
import { Container, Button, TextField } from '@material-ui/core';

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

  return (
    <Container maxWidth="md">
      <form>
        <h1>Submit a Scholarship</h1>
        <TextField
          id="name"
          label="Scholarship Name *"
          value={formFieldStates.name}
          onChange={updateFn('name')}
        />
        <TextField
          id="description"
          label="Description *"
          value={formFieldStates.description}
          onChange={updateFn('description')}
        />
        <TextField
          id="website"
          label="Website *"
          value={formFieldStates.website}
          onChange={updateFn('website')}
        />
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
}
export default ScholarshipForm;
