import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function Filter() {
  const classes = useStyles();
  const [major, setMajor] = useState('');
  const [grade, setGrade] = useState('');
  const [amount, setAmout] = useState('');

  const selectMajor = (event) => {
    setMajor(event.target.value);
  };
  const selectGrade = (event) => {
    setGrade(event.target.value);
  };
  const selectAmount = (event) => {
    setAmout(event.target.value);
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Major</InputLabel>
        <Select value={major} onChange={selectMajor} label="Major">
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="Chemical Eng.">Chemical Eng.</MenuItem>
          <MenuItem value="Computer Science">Computer Science</MenuItem>
          <MenuItem value="Data Science">Data Science</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Grade</InputLabel>
        <Select value={grade} onChange={selectGrade} label="Grade">
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value={12}>Highschool Senior</MenuItem>
          <MenuItem value={13}>College Freshman</MenuItem>
          <MenuItem value={14}>College Sophomore</MenuItem>
          <MenuItem value={15}>College Junior</MenuItem>
          <MenuItem value={16}>College Senior</MenuItem>
        </Select>
      </FormControl>

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>Amount</InputLabel>
        <Select value={amount} onChange={selectAmount} label="Amount">
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value={500}>{'> 500'}</MenuItem>
          <MenuItem value={1000}>{'> 1000'}</MenuItem>
          <MenuItem value={1000}>{'> 5000'}</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default Filter;
