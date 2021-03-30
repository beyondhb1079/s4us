import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { MenuItem } from '@material-ui/core';

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

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
        className={classes.selectStyle}>
        {!removeNone && (
          <MenuItem aria-label="None" value="">
            <em>{label}</em>
          </MenuItem>
        )}
        {Object.keys(items).map((key) => (
          <MenuItem key={key} value={10}>
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
