import React from 'react';
import { InputLabel, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import PropTypes from 'prop-types';

/* eslint-disable react/jsx-props-no-spreading */
function FormikAutocomplete(props) {
  const { label, labelStyle, options, freeSolo } = props;
  console.log(freeSolo);

  return (
    <>
      <InputLabel className={labelStyle}>{label}</InputLabel>
      <Autocomplete
        freeSolo={freeSolo}
        multiple
        options={options.map((option) => option.title)}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" fullWidth />
        )}
      />
    </>
  );
}

FormikAutocomplete.propTypes = {
  label: PropTypes.string,
  labelStyle: PropTypes.string,
  options: PropTypes.array.isRequired,
  freeSolo: PropTypes.bool,
};
FormikAutocomplete.defaultProps = {
  label: '',
  labelStyle: '',
  freeSolo: false,
};
export default FormikAutocomplete;
