import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

function SortDropdown(props) {
  const { items, updateSorting } = props;
  const label = 'Sorting';
  const [choice, setChoice] = useState('deadlineSoon');
  const classes = useStyles();

  function selectChoice(event) {
    console.log(`switch Value changed to: ${event.target.value}`);
    setChoice(event.target.value);
    updateSorting(event.target.value);
  }

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>{label}</InputLabel>
        <Select value={choice} onChange={selectChoice} label={label}>
          {Object.keys(items).map((key) => (
            <MenuItem key={key} value={key}>
              {items[key]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

SortDropdown.propTypes = {
  updateSorting: PropTypes.func.isRequired,
  items: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default SortDropdown;
