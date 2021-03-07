import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Popover } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    margin: theme.spacing(1),
    height: theme.spacing(4),
  },
  popOverWindow: {
    minWidth: '200px',
  },
}));

const gradeitems = [
  'HSSenior',
  'CollegeFreshman',
  'CollegeSophomore',
  'CollegeJunior',
  'CollegeSenior',
];

export default function GradeLevelFilter() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const [selectedGrades, setSelectedGrades] = useState(new Set());

  function updateGradeSelection(value) {
    const newSet = new Set(selectedGrades);
    if (selectedGrades.has(value)) {
      newSet.delete(value);
      setSelectedGrades(newSet);
    } else {
      newSet.add(value);
      setSelectedGrades(newSet);
    }
  }

  return (
    <>
      <Button
        variant="outlined"
        className={classes.buttonStyle}
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon color="primary" />}>
        Grade
      </Button>
      <Popover
        className={classes.popOverWindow}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
        {Object.keys(gradeitems).map((key) => (
          <>
            <input
              key={key}
              type="checkbox"
              onClick={() => updateGradeSelection(gradeitems[key])}
              checked={selectedGrades.has(gradeitems[key])}
              value={gradeitems[key]}
            />
            {gradeitems[key]}
            <br />
          </>
        ))}
      </Popover>
    </>
  );
}
