import React, { useState } from 'react';
import { Autocomplete, IconButton, OutlinedInput } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';

/* eslint-disable react/jsx-props-no-spreading */
export default function AutocompleteFilter(props) {
  const { limitReached, placeholder, ...otherProps } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Autocomplete
      multiple
      filterSelectedOptions
      open={isOpen && !limitReached}
      disabled={limitReached}
      onInputChange={(e, val) => setIsOpen(val.length > 0)}
      renderTags={() => null}
      {...otherProps}
      renderInput={(params) => (
        <OutlinedInput
          ref={params.InputProps.ref}
          inputProps={params.inputProps}
          placeholder={!limitReached ? placeholder : 'Limit reached'}
          size="small"
          fullWidth
          startAdornment={<SearchIcon />}
          endAdornment={
            <IconButton
              onClick={() => setIsOpen(!isOpen)}
              disabled={limitReached}>
              {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </IconButton>
          }
        />
      )}
    />
  );
}

AutocompleteFilter.propTypes = {
  limitReached: PropTypes.bool,
  placeholder: PropTypes.string,
};

AutocompleteFilter.defaultProps = {
  limitReached: false,
  placeholder: undefined,
};
