import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

export default function ProfileInput() {
  const [daca, setDaca] = React.useState('');

  const handleDacaChange = (event) => {
    setDaca(event.target.value);
  };

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Type</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={daca} onChange={handleDacaChange}>
          <FormControlLabel value="Student" control={<Radio />} label="Student" />
          <FormControlLabel value="Organization" control={<Radio />} label="Organization" />
          <FormControlLabel value="Parent" control={<Radio />} label="Parent" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}