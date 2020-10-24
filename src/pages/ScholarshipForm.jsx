import React from 'react';
import { Container, Button } from '@material-ui/core';
import TextFieldComp from '../components/TextFieldComp';

function ScholarshipForm() {
  return (
    <Container maxWidth="md">
      <form>
        <h1>Submit a Scholarship</h1>
        <TextFieldComp id="name" label="Scholarship Nam *" />
        <TextFieldComp id="description" label="Description *" />
        <TextFieldComp id="website" label="Website *" />
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
}
export default ScholarshipForm;
