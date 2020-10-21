import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  makeStyles,
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
import { ScholarshipFields } from './formFields';

const useStyles = makeStyles({
  fieldStyle: {
    margin: '10px 0;',
  },
  formControlStyle: {
    width: '40%',
  },
});

function ScholarshipForm() {
  const classes = useStyles();

  const [formFieldStates, setFormFieldStates] = useState({
    name: '',
    deadline: null,
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
      return <div />;
    if (amountTypeState === 'fixed' || amountTypeState === 'unknown') {
      const rewardAmountRef = ScholarshipFields.rewardAmount.amount;
      return (
        <TextField
          key={rewardAmountRef.key}
          id="amount"
          label={rewardAmountRef.label}
          className={classes.fieldStyle}
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
        className={classes.fieldStyle}
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

  function displayField(fieldKey) {
    const { key } = ScholarshipFields[fieldKey];
    const { label } = ScholarshipFields[fieldKey];
    const { type } = ScholarshipFields[fieldKey];

    switch (type) {
      case 'text':
      case 'number':
        return (
          <TextField
            key={key}
            id={fieldKey}
            label={label}
            className={classes.fieldStyle}
            type={type === 'text' ? 'text' : 'number'}
            InputLabelProps={{ shrink: true }}
            fullWidth
            InputProps={{ inputProps: { min: 0, step: 50 } }}
            value={formFieldStates[fieldKey]}
            onChange={(e) =>
              handleFieldChange(
                fieldKey,
                type === 'number'
                  ? parseInt(e.target.value, 10)
                  : e.target.value
              )
            }
          />
        );

      case 'date':
        return (
          <MuiPickersUtilsProvider utils={DateFnsUtils} key={key}>
            <KeyboardDatePicker
              id={fieldKey}
              label={label}
              value={formFieldStates[fieldKey]}
              onChange={(date) => handleFieldChange(fieldKey, date)}
              format="MM/dd/yyyy"
            />
          </MuiPickersUtilsProvider>
        );

      case 'select':
        return (
          <FormControl key={key} className={classes.formControlStyle}>
            <InputLabel shrink>{label}</InputLabel>
            <Select
              label={label}
              id={fieldKey}
              value={formFieldStates[fieldKey]}
              onChange={(e) => handleFieldChange(fieldKey, e.target.value)}>
              {ScholarshipFields[fieldKey].options.map((option) => {
                return (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );

      case 'checkbox':
        return (
          <FormControl key={key}>
            <FormControlLabel
              value={ScholarshipFields[fieldKey]}
              onChange={(e) => handleFieldChange(fieldKey, e.target.checked)}
              control={<Checkbox color="primary" />}
              label={label}
              labelPlacement="start"
            />
          </FormControl>
        );

      case 'amountSub':
        return displayAmountFields();

      default:
        return <div />;
    }
  }

  return (
    <Container style={{ width: '40%' }}>
      <h1>Submit a Scholarship</h1>
      <form noValidate autoComplete="off">
        {Object.keys(ScholarshipFields).map((field) => displayField(field))}
        <Button variant="contained" color="primary" onClick={submitScholarship}>
          Submit
        </Button>
      </form>
    </Container>
  );
}
export default ScholarshipForm;

/*
{Object.keys(FieldData).map(field => (
  <TextField className={classes.fieldStyle} id={FieldData[field]["idName"]} label={FieldData[field]["label"]} type={FieldData[field]["type"]} InputLabelProps={{ shrink: true }} fullWidth />
))}
*/
