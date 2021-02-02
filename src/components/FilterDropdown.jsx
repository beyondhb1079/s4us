import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectStyle: {
    height: theme.spacing(4),
  },
}));

function FilterDropdown(props) {
  const { label, items, defaultValue, removeNone, onChange } = props;
  const [choice, setChoice] = useState(defaultValue);
  const classes = useStyles();

  function selectChoice(event) {
    setChoice(event.target.value);
    onChange(event.target.value);
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        value={choice}
        onChange={selectChoice}
        displayEmpty
        className={classes.selectStyle}>
        {!removeNone && (
          <MenuItem value="">
            <em>{label}</em>
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
  removeNone: PropTypes.bool,
  onChange: PropTypes.func,
};

FilterDropdown.defaultProps = {
  defaultValue: '',
  onChange: () => {},
  removeNone: false,
};
export default FilterDropdown;
