import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  console.log(label);
  const classes = useStyles();

  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <Select
        native
        value={value}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty
        className={classes.selectStyle}>
        {!removeNone && <option aria-label="None" value="" />}
        {Object.keys(items).map((key) => (
          <option key={key} value={10}>
            {items[key]}
          </option>
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
