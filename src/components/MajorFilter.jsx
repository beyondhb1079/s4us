import React, { useState } from 'react';
import { Button, Autocomplete, Popover, Chip, TextField } from '@mui/material';
import { MAJORS } from '../types/options';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import PropTypes from 'prop-types';

function MajorFilter(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { majors, changeFn } = props;

  return (
    <>
      <Button
        variant="outlined"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<ArrowDropDownIcon color="primary" />}
        sx={{ margin: 1, height: (theme) => theme.spacing(4) }}>
        Majors
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        sx={{ maxWidth: 400 }}>
        {majors.map((major) => (
          <Chip
            label={major}
            variant="outlined"
            color="primary"
            key={major}
            onDelete={() =>
              setMajors((chips) => chips.filter((chip) => chip !== major))
            }
            sx={{ mx: 1, mt: 1, color: '#000' }}
          />
        ))}
        <Autocomplete
          multiple
          open={isOpen}
          value={majors}
          onChange={(e, val) => changeFn(val)}
          onInputChange={(e, val) => {
            if (val.length > 0) setIsOpen(true);
            else setIsOpen(false);
          }}
          options={[...MAJORS]}
          renderTags={() => null}
          renderInput={(params) => (
            <TextField
              ref={params.InputProps.ref}
              inputProps={params.inputProps}
              autoFocus
              placeholder="Filter Majors"
              size="small"
              sx={{ mx: 1, my: 1 }}
            />
          )}
        />
      </Popover>
    </>
  );
}

export default MajorFilter;

MajorFilter.propTypes = {
  majors: PropTypes.arrayOf(PropTypes.string),
  changeFn: PropTypes.func.isRequired,
};

MajorFilter.defaultProps = {
  majors: [],
};
