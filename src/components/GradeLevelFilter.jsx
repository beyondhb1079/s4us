import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Popover,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    height: theme.spacing(4),
  },
  popover: {
    padding: theme.spacing(2),
  },
}));

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
  const classes = useStyles();
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
        className={classes.button}
        onClick={openPopover}
        endIcon={<ArrowDropDownIcon color="primary" />}
      >
        Grade
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <FormControl component="fieldset" className={classes.popover}>
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
