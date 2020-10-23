import React, { useState } from 'react';
import { Container, TextField, Button } from '@material-ui/core';
import { ScholarshipFields } from './formFields';

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

  function handleFieldChange(index, value) {
    setFormFieldStates((prev) => ({ ...prev, [index]: value }));
  }
  function submitScholarship() {
    console.log(formFieldStates); // eslint-disable-line no-console
  }

  // displays the fields for amount depending on the type of amount
  function displayAmountFields(index) {
    const amountTypeState = formFieldStates.amountType;
    if (
      !amountTypeState ||
      amountTypeState === 'unknown' ||
      amountTypeState === 'fullride'
    )
      return <div key="none" />;
    if (amountTypeState === 'fixed') {
      const rewardAmountRef = ScholarshipFields.rewardAmount.amount;
      return (
        <TextField
          key={rewardAmountRef.key}
          id="amount"
          label={rewardAmountRef.label}
          type="number"
          InputLabelProps={{ shrink: true }}
          fullWidth
          InputProps={{ inputProps: { min: 0, step: 50 } }}
          value={amountTypeState}
          onChange={(e) =>
            handleFieldChange(index, parseInt(e.target.value, 10) || '')
          }
        />
      );
    }
    return ['minAmount', 'maxAmount'].map((field) => (
      <TextField
        key={ScholarshipFields.rewardAmount[field].key}
        id={field}
        label={ScholarshipFields.rewardAmount[field].label}
        type="number"
        InputLabelProps={{ shrink: true }}
        fullWidth
        InputProps={{ inputProps: { min: 0, step: 50 } }}
        value={formFieldStates[field]}
        onChange={(e) =>
          handleFieldChange(field, parseInt(e.target.value, 10) || '')
        }
      />
    ));
  }

  return (
    <Container style={{ width: '40%' }}>
      <h1>Submit a Scholarship</h1>
      <form noValidate autoComplete="off">
        {Object.entries(ScholarshipFields).map(
          ([field, component]) => component
        )}
        <Button variant="contained" color="primary" onClick={submitScholarship}>
          Submit
        </Button>
      </form>
    </Container>
  );
}
export default ScholarshipForm;
