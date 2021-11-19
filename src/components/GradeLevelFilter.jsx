import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Popover,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const gradeItems = [
  '12th - High School',
  'College Freshman',
  'College Sophomore',
  'College Junior',
  'College Senior',
  '5th Year',
  'Post Grad',
];

export default function GradeLevelFilter() {
  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = (event) => setAnchorEl(event.currentTarget);
  const [selectedGrades, setSelectedGrades] = useState(new Set());

  function toggleSelection(grade) {
    const newSet = new Set(selectedGrades);
    if (selectedGrades.has(grade)) {
      newSet.delete(grade);
    } else {
      newSet.add(grade);
    }
    setSelectedGrades(newSet);
  }

  return (
    <>
      <Button
        variant="outlined"
        sx={{ margin: 1, height: (theme) => theme.spacing(4) }}
        onClick={openPopover}
        endIcon={<ArrowDropDownIcon color="primary" />}>
        Grade
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
        <FormControl component="fieldset" sx={{ padding: 2 }}>
          <FormGroup>
            {Array.from(gradeItems).map((grade) => (
              <FormControlLabel
                key={grade}
                control={
                  <Checkbox
                    color="primary"
                    checked={selectedGrades.has(grade)}
                    onChange={() => toggleSelection(grade)}
                    name="grade"
                  />
                }
                label={grade}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Popover>
    </>
  );
}
