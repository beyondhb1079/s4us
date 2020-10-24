import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

function TextFieldComp(props) {
  const { id, label, value } = props;

  function handleFieldChange(e) {
    props.onChange(e.target.id, e.target.value);
  }
  return (
    <TextField
      id={id}
      label={label}
      type="text"
      value={value}
      onChange={handleFieldChange}
      fullWidth
    />
  );
}

TextFieldComp.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default TextFieldComp;
