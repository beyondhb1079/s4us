import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ProfileInput() {
  const classes = useStyles();
  const [type, setType] = React.useState('');
  const [cover, setCover] = React.useState('');

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleCoverChange = (event) => {
    setCover(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Scholarship Type</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={type} onChange={handleTypeChange}>
          <MenuItem value={20}>Grants</MenuItem>
          <MenuItem value={30}>Loans</MenuItem>
          <MenuItem value={40}>Option 1</MenuItem>
          <MenuItem value={50}>Option 2</MenuItem>
        </Select>
      </FormControl>
      <br />
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Require Cover Letter</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cover}
          onChange={handleCoverChange}
        >
          <MenuItem value={10}>Yes</MenuItem>
          <MenuItem value={20}>No</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}