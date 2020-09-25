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
  const [amount, setAmount] = React.useState('');

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleCoverChange = (event) => {
    setCover(event.target.value);
  };
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>Scholarship Type</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={type} onChange={handleTypeChange}>
          <MenuItem value={20}>Grants</MenuItem>
          <MenuItem value={30}>Loans</MenuItem>
        </Select>
      </FormControl>
      <br />
      <FormControl className={classes.formControl}>
        <InputLabel>Require Cover Letter</InputLabel>
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
      <br />
      <FormControl className={classes.formControl}>
        <InputLabel>Amount</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={amount}
          onChange={handleAmountChange}
        >
          <MenuItem value={10}>&gt; 500</MenuItem>
          <MenuItem value={20}>&gt; 1000</MenuItem>
          <MenuItem value={30}>&gt; 5000</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
