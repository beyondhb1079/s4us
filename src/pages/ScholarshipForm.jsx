import React from 'react';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function ScholarshipForm(){
    return(
        <Container>
            <h1>Submit a Scholarship</h1>
            <FormControl>
                <TextField id="standard-basic" label="scholarship name *" />
                <TextField id="standard-basic" label="Deadline *" />
                <TextField id="standard-basic" label="amount *" />
                <TextField id="standard-basic" label="website url *" />
                <Button variant="contained" color="primary">Submit</Button>
            </FormControl>
        </Container>
    )
}
export default ScholarshipForm;