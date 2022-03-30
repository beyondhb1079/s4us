import React, { useState } from 'react';
import { Autocomplete, Chip, OutlinedInput, IconButton } from '@mui/material';
import { MAJORS } from '../types/options';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PropTypes from 'prop-types';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SearchIcon from '@mui/icons-material/Search';

function MajorFilter({ majors, onChange, majorParams }) {
  const [isOpen, setIsOpen] = useState(false);
  const limitReached = majors.length >= 10;

  return (
    <>
      <Autocomplete
        multiple
        freeSolo
        filterSelectedOptions
        open={isOpen && !limitReached}
        value={majors}
        onChange={(e, val) => onChange(val)}
        disabled={limitReached}
        onInputChange={(e, val) => setIsOpen(val.length > 0)}
        options={[...MAJORS]}
        renderTags={() => null}
        renderInput={(params) => (
          <OutlinedInput
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            autoFocus
            placeholder={
              !limitReached ? 'Enter a major to filter by...' : 'Limit reached'
            }
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

      {majors.map((major) => (
        <Chip
          label={major}
          variant={majorParams.includes(major) ? 'contained' : 'outlined'}
          color={majorParams.includes(major) ? 'primary' : 'default'}
          key={major}
          onClick={() => onChange(majors.filter((m) => m !== major))}
          onDelete={() => onChange(majors.filter((m) => m !== major))}
          sx={{ mx: 1, mt: 1 }}
        />
      ))}
    </>
  );
}
export default MajorFilter;

MajorFilter.propTypes = {
  majors: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  majorParams: PropTypes.arrayOf(PropTypes.string),
};

MajorFilter.defaultProps = {
  majors: [],
  majorParams: [],
};
