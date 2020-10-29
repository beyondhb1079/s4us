import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  formControl: {
    minWidth: 200,
  },
});

function EnumSelectField(props) {
  const classes = useStyles();
  const { label, value, onChange, enums } = props;
  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink>{label}</InputLabel>
      <Select {...{ value, onChange }}>
        {Object.keys(enums).map((option) => {
          return (
            <MenuItem key={option} value={enums[option]}>
              {option}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}
EnumSelectField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  enums: PropTypes.oneOfType([PropTypes.string]).isRequired,
};
export default EnumSelectField;
