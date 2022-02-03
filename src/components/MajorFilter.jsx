import React, { useState } from 'react';
import { Autocomplete, Chip, OutlinedInput, IconButton } from '@mui/material';
import { MAJORS } from '../types/options';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PropTypes from 'prop-types';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SearchIcon from '@mui/icons-material/Search';

function MajorFilter({ majors, onSelect, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Autocomplete
        multiple
        freeSolo
        filterSelectedOptions
        open={isOpen}
        value={majors}
        onChange={(e, val) => onSelect(val)}
        disabled={majors.length >= 10}
        onInputChange={(e, val) => setIsOpen(val.length > 0)}
        options={[...MAJORS]}
        renderTags={() => null}
        renderInput={(params) => (
          <OutlinedInput
            ref={params.InputProps.ref}
            inputProps={params.inputProps}
            autoFocus
            placeholder={
              majors.length < 10
                ? 'Enter a major to filter by...'
                : 'Limit reached'
            }
            size="small"
            fullWidth
            startAdornment={<SearchIcon />}
            endAdornment={
              <IconButton onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </IconButton>
            }
          />
        )}
      />

      {majors.map((major) => (
        <Chip
          label={major}
          variant="outlined"
          color="primary"
          key={major}
          onDelete={() => onDelete(major)}
          sx={{ mx: 1, mt: 1, color: '#000' }}
        />
      ))}
    </>
  );
}

export default MajorFilter;

MajorFilter.propTypes = {
  majors: PropTypes.arrayOf(PropTypes.string),
  onSelect: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

MajorFilter.defaultProps = {
  majors: [],
};
