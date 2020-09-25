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

export default function ProfileStepper() {
  const classes = useStyles();
  const [grade, setGrade] = React.useState('');
  const [gradYear, setGradeYear] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [major, setMajor] = React.useState('');
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleMajorChange = (event) => {
    setMajor(event.target.value);
  };
  const handleGradeChange = (event) => {
    setGrade(event.target.value);
  };
  const handleGradChange = (event) => {
    setGradeYear(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Grade</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={grade} onChange={handleGradeChange}>
          <MenuItem value={20}>Highschool Senior</MenuItem>
          <MenuItem value={30}>College Freshman</MenuItem>
          <MenuItem value={40}>College Sophomore</MenuItem>
          <MenuItem value={50}>College Junior</MenuItem>
          <MenuItem value={60}>College Senior</MenuItem>
        </Select>
      </FormControl>
      <br />
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Graduation Year</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gradYear}
          onChange={handleGradChange}
        >
          <MenuItem value={10}>2020</MenuItem>
          <MenuItem value={20}>2021</MenuItem>
          <MenuItem value={30}>2022</MenuItem>
        </Select>
      </FormControl>
      <br />
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Major</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={major}
          onChange={handleMajorChange}
        >
          <MenuItem value={10}>Computer Science</MenuItem>
          <MenuItem value={20}>Chemical Engineering</MenuItem>
          <MenuItem value={30}>Data Science</MenuItem>
        </Select>
      </FormControl>
      <br />
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          onChange={handleGenderChange}
        >
          <MenuItem value={10}>Male</MenuItem>
          <MenuItem value={20}>Female</MenuItem>
        </Select>
      </FormControl>
      <br />
      <FormControl component="fieldset">
        <FormLabel component="legend">Status</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
          <FormControlLabel value="daca" control={<Radio />} label="Have DACA" />
          <FormControlLabel value="noDaca" control={<Radio />} label="No DACA" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
