import React from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

function TextFieldComp(properties) {
  const { id, label, type } = properties;
  return (
    <TextField
      key={id}
      id={id}
      label={label}
      type={type}
      InputLabelProps={{ shrink: true }}
      fullWidth
      InputProps={{ inputProps: { min: 0, step: 50 } }}
    />
  );
}

export const ScholarshipFields = {
  name: TextFieldComp({
    id: 'name',
    label: 'Scholarship Name *',
    type: 'text',
  }),
  deadline: (
    <MuiPickersUtilsProvider utils={DateFnsUtils} key="date">
      <KeyboardDatePicker id="date" label="Deadline *" format="MM/dd/yyyy" />
    </MuiPickersUtilsProvider>
  ),
  description: TextFieldComp({
    id: 'description',
    label: 'Description *',
    type: 'text',
  }),
  website: TextFieldComp({ id: 'website', label: 'Website *', type: 'text' }),
  scholarshipType: (
    <FormControl key="scholarshipType">
      <InputLabel shrink>Type of Scholarship ?</InputLabel>
      <Select id="scholarshipType">
        {['unknown', 'academic', 'sports', 'community', 'organization'].map(
          (option) => {
            return (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            );
          }
        )}
      </Select>
    </FormControl>
  ),
  active: (
    <FormControl key="active">
      <FormControlLabel
        control={<Checkbox color="primary" />}
        label="Scholarship Active ?"
        labelPlacement="start"
      />
    </FormControl>
  ),
};
/*
export const ScholarshipFields = {
  amountType: {
    key: 4,
    label: 'Type of Reward? *',
    type: 'select',
    options: ['unknown', 'fixed', 'range', 'fullride'], // TODO: replace with enums
  },
  rewardAmount: {
    type: 'amountSub',
    amount: {
      key: 5,
      label: 'Amount *',
      type: 'number',
    },
    minAmount: {
      key: 6,
      label: 'Minimum *',
      type: 'number',
    },
    maxAmount: {
      key: 7,
      label: 'Maximum *',
      type: 'number',
    },
  },
}; */

// TODO: implement Eligibility fields
export const EligibilityFields = {
  gpa: {
    // text field
    key: 1,
    label: 'GPA',
    type: 'number',
  },
  majors: {
    // multiple value autocomplete
    key: 2,
    label: 'Major/Majors',
    type: 'multi-autocomplete',
  },
  grades: {
    // multiple value autocomplete
    key: 3,
    label: 'Grade/Grades',
    type: 'multi-autocomplete',
  },
  schools: {
    // multiple value autocomplete
    key: 4,
    label: 'School/Schools',
    type: 'multi-autocomplete',
  },
  states: {
    // multiple value autocomplete
    key: 5,
    label: 'State/States',
    type: 'multi-autocomplete',
  },
  'first-gen': {
    // checkbox
    key: 6,
    label: 'First Generation?',
    type: 'checkbox',
  },
  gender: {
    // select (unknown, male, female, other)
    key: 7,
    label: 'Gender',
    type: 'select',
  },
  daca: {
    // select (unknown, required, not required)
    key: 8,
    label: 'Daca required?',
    type: 'select',
  },
};
