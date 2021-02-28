import React from 'react';
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
  const { label, items, value, removeNone, onChange } = props;
  const classes = useStyles();

  function selectChoice(event) {
    onChange(event.target.value);
  }

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        value={value}
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
  value: PropTypes.string,
  items: PropTypes.objectOf(PropTypes.string).isRequired,
  removeNone: PropTypes.bool,
  onChange: PropTypes.func,
};

FilterDropdown.defaultProps = {
  value: '',
  onChange: () => {},
  removeNone: false,
};

export default FilterDropdown;
