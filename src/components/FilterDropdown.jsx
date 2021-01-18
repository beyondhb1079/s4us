import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function FilterDropdown(props) {
  const { label, items, defaultSelect, removeNone, givenFunction } = props;
  const [choice, setChoice] = useState(`${defaultSelect}`);
  const classes = useStyles();

  function updateSort(sortOption) {
    switch (sortOption) {
      case 'deadlineSoon':
        return givenFunction('one');
      case 'deadlineLatest':
        return givenFunction('two');
      case 'amountLow':
        return givenFunction('three');
      case 'amountHigh':
        return givenFunction('four');
      default:
        return null;
    }
  }

  function selectChoice(event) {
    setChoice(event.target.value);
    updateSort(event.target.value);
  }

  return (
    <>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel>{label}</InputLabel>
        <Select value={choice} onChange={selectChoice} label={label}>
          {removeNone ? null : (
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          )}
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

FilterDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  defaultSelect: PropTypes.string.isRequired,
  items: PropTypes.objectOf(PropTypes.string).isRequired,
  removeNone: PropTypes.bool.isRequired,
  givenFunction: PropTypes.func.isRequired,
};
export default FilterDropdown;
