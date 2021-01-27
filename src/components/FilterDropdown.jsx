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
  const { label, items, defaultValue, removeNone, onChange } = props;
  const [choice, setChoice] = useState(`${defaultValue}`);
  const classes = useStyles();

  function selectChoice(event) {
    setChoice(event.target.value);
    if (onChange !== null) onChange(event.target.value);
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel>{label}</InputLabel>
      <Select value={choice} onChange={selectChoice} label={label}>
        {!removeNone && (
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
  );
}

FilterDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  items: PropTypes.objectOf(PropTypes.string).isRequired,
  removeNone: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
};

FilterDropdown.defaultProps = {
  defaultValue: '',
  onChange: null,
};
export default FilterDropdown;
