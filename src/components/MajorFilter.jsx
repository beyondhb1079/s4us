import React, { useState } from 'react';
import { Autocomplete, Chip, OutlinedInput, IconButton } from '@mui/material';
import { MAJORS } from '../types/options';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PropTypes from 'prop-types';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SearchIcon from '@mui/icons-material/Search';
import useQueryParams from '../lib/useQueryParams';

function MajorFilter({ majors, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [{ majors: origMajors }] = useQueryParams();
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
          variant={origMajors?.includes(major) ? 'contained' : 'outlined'}
          color="primary"
          key={major}
          onClick={() => onChange(majors.filter((m) => m !== major))}
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
};

MajorFilter.defaultProps = {
  majors: [],
};
