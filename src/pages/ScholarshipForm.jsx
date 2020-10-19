import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const ScholarshipFields = {
  1:{ //text field
    idName: "name",
    label: "Scholarship Name *",
    type: "text",
  },
  2:{ //date picker
    idName:"deadline",
    label: "Deadline *",
    type: "date"
  },
  3:{ //text field
    idName: "description",
    label: "Description",
    type: "text"
  },
  4:{ //select (unknown, fixed, range, full ride)
    idName:"amount-type",
    label: "Type of Reward?",
    type:"select"
  },
  5:{ //text field
    idName:"amount",
    label: "Amount *",
    type: "number"
  },
  6: { //text field
    idName: "min-amount",
    label: "Minimum *",
    type: "number"
  },
  7:{ //text field
    idNAme: "max-amount",
    label: "Maximum *",
    type: "number"
  },
  8:{ //text field
    idName:"website",
    label: "Website *",
    type:"text"
  }, 
  9:{ //select (unknown, academic, sports, community, organization)
    idName: "scholarship-type",
    label: "Type of Scholarship?",
    type: "select"
  },
  10: { //checkbox
    idName:"active",
    label: "Scholarship Active?",
    type: "checkbox"
  }
};

const EligibilityFields = {
  1: { //text field
    idName: "gpa",
    label: "GPA",
    type: "number"
  },
  2: { //multiple value autocomplete
    idName: "majors",
    label: "Major/Majors",
    type: "multi-autocomplete"
  },
  3: {//multiple value autocomplete
    idName: "grade",
    label: "Grade/Grades",
    type: "multi-autocomplete"
  },
  4:{ //multiple value autocomplete
    idName: "schools",
    label: "School/Schools",
    type: "multi-autocomplete"
  },
  5:{ //multiple value autocomplete
    idName: "state",
    label: "State/States",
    type: "multi-autocomplete" 
  },
  6:{ //checkbox
    idName: "first-gen",
    label: "First Generation?",
    type: "checkbox"
  },
  7: { //select (unknown, male, female, other)
    idName: "gender",
    label: "Gender",
    type: "select"
  },
  8: { //select (unknown, required, not required)
    idName: "daca",
    label: "Daca required?",
    type: "select"
  }
}


const useStyles = makeStyles(({
  fieldStyle: {
    margin: '10px 0;',
  },
}));

function ScholarshipForm() {
  const classes = useStyles();

  function displayForms(formProps){
    switch(formProps.type){
      case "text":
        return <TextField className={classes.fieldStyle} id={formProps.idName} />
    }
  }

  return (
    <Container style={{ width: '40%' }}>
      <h1>Submit a Scholarship</h1>
      <form>
        <Button variant="contained" color="primary">Submit</Button>
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