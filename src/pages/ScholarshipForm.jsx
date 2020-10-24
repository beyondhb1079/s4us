import React, { useState } from 'react';
import { Container, Button } from '@material-ui/core';
import TextFieldComp from '../components/TextFieldComp';

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

  function handleFieldChange(name, value) {
    setFormFieldStates((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <Container maxWidth="md">
      <form>
        <h1>Submit a Scholarship</h1>
        <TextFieldComp
          id="name"
          label="Scholarship Name *"
          value={formFieldStates.name}
          onChange={handleFieldChange}
        />
        <TextFieldComp
          id="description"
          label="Description *"
          value={formFieldStates.description}
          onChange={handleFieldChange}
        />
        <TextFieldComp
          id="website"
          label="Website *"
          value={formFieldStates.website}
          onChange={handleFieldChange}
        />
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
}
export default ScholarshipForm;
