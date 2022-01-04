import React, { useState } from 'react';
import { Button, Autocomplete, InputBase, Popover } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MAJORS } from '../types/options';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const StyledInput = styled(InputBase)(({ theme }) => ({
  padding: 10,

  '& input': {
    borderRadius: 2,
    padding: 8,

    '&:focus': {
      boxShadow: `0px 0px 0px 3px ${
        theme.palette.mode === 'light'
          ? 'rgba(3, 102, 214, 0.3)'
          : 'rgb(12, 45, 107)'
      }`,
    },
  },
}));

function MajorFilter() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [majors, setMajors] = useState([]);

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
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
        <Autocomplete
          multiple
          value={majors}
          onClose={() => setAnchorEl(null)}
          onChange={(e, val) => setMajors(val)}
          options={[...MAJORS]}
          renderTags={() => null}
          renderInput={(params) => {
            delete params.inputProps.onMouseDown;
            return (
              <StyledInput
                ref={params.InputProps.ref}
                inputProps={params.inputProps}
                autoFocus
                placeholder="Filter Majors"
              />
            );
          }}
        />
      </Popover>
    </>
  );
}

export default MajorFilter;
