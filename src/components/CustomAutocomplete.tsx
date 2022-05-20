import React, { useState } from 'react';
import { Autocomplete, IconButton, OutlinedInput } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

type CustomAutocompleteProps = {
  limitReached: boolean;
  placeholder: string | undefined;
  options: string[];
  [x: string]: any;
};

/* eslint-disable react/jsx-props-no-spreading */
export default function CustomAutocomplete(
  props: CustomAutocompleteProps
): JSX.Element {
  const { limitReached, placeholder, ...otherProps } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('filters');

  return (
    <Autocomplete
      multiple
      filterSelectedOptions
      open={isOpen && !limitReached}
      disabled={limitReached}
      onInputChange={(e, val) => setIsOpen(val.length > 0)}
      forcePopupIcon={false}
      {...otherProps}
      renderInput={(params) => (
        <OutlinedInput
          ref={params.InputProps.ref}
          inputProps={params.inputProps}
          placeholder={!limitReached ? placeholder : t('limitReached')}
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

CustomAutocomplete.propTypes = {
  limitReached: PropTypes.bool,
  placeholder: PropTypes.string,
};

CustomAutocomplete.defaultProps = {
  limitReached: false,
  placeholder: undefined,
};
