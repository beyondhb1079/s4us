import React, { useState } from 'react';
import {
  Button,
  Autocomplete,
  Popover,
  Chip,
  OutlinedInput,
  IconButton,
} from '@mui/material';
import { MAJORS } from '../types/options';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

function MajorFilter() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [majors, setMajors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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
        onClose={() => {
          setAnchorEl(null);
          setIsOpen(false);
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{ style: { width: 280 } }}>
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
          freeSolo
          open={isOpen}
          value={majors}
          disabled={majors.length >= 10}
          onChange={(e, val) => setMajors(val)}
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
              endAdornment={
                <IconButton onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </IconButton>
              }
            />
          )}
          sx={{ mx: 1, my: 1 }}
        />
      </Popover>
    </>
  );
}

export default MajorFilter;
