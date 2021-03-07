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
    fontSize: '15px',
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
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
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const [selectedGrades, setSelectedGrades] = useState(new Set());

  function updateGradeSelection(gradeSelected) {
    const newSet = new Set(selectedGrades);
    if (selectedGrades.has(gradeSelected)) {
      newSet.delete(gradeSelected);
      setSelectedGrades(newSet);
    } else {
      newSet.add(gradeSelected);
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
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
        {Object.keys(gradeItems).map((key) => (
          <div className={classes.popOverWindow}>
            <input
              key={key}
              type="checkbox"
              onClick={() => updateGradeSelection(gradeItems[key])}
              checked={selectedGrades.has(gradeItems[key])}
              value={gradeItems[key]}
            />
            {gradeItems[key]}
            <br />
          </div>
        ))}
      </Popover>
    </>
  );
}
