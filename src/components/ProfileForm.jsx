import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ProfileForm() {
  const classes = useStyles();
  const [grade, setGrade] = React.useState('');
  const [gradYear, setGradYear] = React.useState('');
  const [major, setMajor] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [daca, setDaca] = React.useState('');

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>Grade</InputLabel>
        <Select value={grade} onChange={(e) => setGrade(e.target.value)}>
          <MenuItem value={20}>Highschool Senior</MenuItem>
          <MenuItem value={30}>College Freshman</MenuItem>
          <MenuItem value={40}>College Sophomore</MenuItem>
          <MenuItem value={50}>College Junior</MenuItem>
          <MenuItem value={60}>College Senior</MenuItem>
        </Select>
      </FormControl>
      <br />
      <FormControl className={classes.formControl}>
        <InputLabel>Graduation Year</InputLabel>
        <Select value={gradYear} onChange={(e) => setGradYear(e.target.value)}>
          <MenuItem value={10}>2020</MenuItem>
          <MenuItem value={20}>2021</MenuItem>
          <MenuItem value={30}>2022</MenuItem>
        </Select>
      </FormControl>
      <br />
      <FormControl className={classes.formControl}>
        <InputLabel>Major</InputLabel>
        <Select value={major} onChange={(e) => setMajor(e.target.value)}>
          <MenuItem value={10}>Computer Science</MenuItem>
          <MenuItem value={20}>Chemical Engineering</MenuItem>
          <MenuItem value={30}>Data Science</MenuItem>
        </Select>
      </FormControl>
      <br />
      <FormControl className={classes.formControl}>
        <InputLabel>Gender</InputLabel>
        <Select value={gender} onChange={(e) => setGender(e.target.value)}>
          <MenuItem value={10}>Male</MenuItem>
          <MenuItem value={20}>Female</MenuItem>
        </Select>
      </FormControl>
      <br />
      <FormControl component="fieldset">
        <FormLabel component="legend">Status</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={daca}
          onChange={(e) => setDaca(e.target.value)}>
          <FormControlLabel
            value="daca"
            control={<Radio />}
            label="Have DACA"
          />
          <FormControlLabel
            value="noDaca"
            control={<Radio />}
            label="No DACA"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
