import React, { useState } from 'react';
import { Container, Button, TextField } from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
        <MuiPickersUtilsProvider utils={DateFnsUtils} key="date">
          {requiredTextField('name', 'Scholarship Name')}
          <KeyboardDatePicker
            id="date"
            label="Deadline *"
            format="MM/dd/yyyy"
            fullWidth
            value={formFieldStates.deadline}
            onChange={(date) =>
              setFormFieldStates({ ...formFieldStates, deadline: date })
            }
          />
          {requiredTextField('description', 'Description')}
          {requiredTextField('website', 'Website')}
        </MuiPickersUtilsProvider>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
}
export default ScholarshipForm;
