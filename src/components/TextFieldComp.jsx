import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

function TextFieldComp(props) {
  const { id, label } = props;
  return <TextField id={id} label={label} type="text" fullWidth />;
}

TextFieldComp.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
export default TextFieldComp;
