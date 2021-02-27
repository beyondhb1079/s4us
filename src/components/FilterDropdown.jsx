import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

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
  const location = useLocation();
  const params = queryString.parse(location.search, { parseNumbers: true });
  const sortByParams =
    params.sortBy === undefined ? 'deadlineAsc' : params.sortBy;
  const [choice, setChoice] = useState(value === 'sorting' ? sortByParams : '');

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
