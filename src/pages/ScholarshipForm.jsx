import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({
  fieldStyle: {
    margin: '10px 0;',
  },
}));

function ScholarshipForm() {
  const classes = useStyles();

  return (
    <Container style={{ width: '40%' }}>
      <h1>Submit a Scholarship</h1>
      <form>
        <TextField className={classes.fieldStyle} id="name" label="Scholarship Name" type="text" InputLabelProps={{ shrink: true }} fullWidth />
        <TextField className={classes.fieldStyle} id="deadline" label="Deadline" type="text" InputLabelProps={{ shrink: true }} fullWidth />
        <TextField className={classes.fieldStyle} id="amount" label="Amount" type="text" InputLabelProps={{ shrink: true }} fullWidth />
        <TextField className={classes.fieldStyle} id="website" label="Website URL" type="text" InputLabelProps={{ shrink: true }} fullWidth />
        <Button variant="contained" color="primary">Submit</Button>
      </form>
    </Container>
  );
}
export default ScholarshipForm;
