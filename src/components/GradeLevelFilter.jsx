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

const gradeList = {
  12: {
    value: 'Highschool Senior',
    isChecked: false,
  },
  13: {
    value: 'College Freshman',
    isChecked: false,
  },
  14: {
    value: 'College Sophomore',
    isChecked: false,
  },
  15: {
    value: 'College Junior',
    isChecked: false,
  },
  16: {
    value: 'College Senior',
    isChecked: false,
  },
};

export default function GradeLevelFilter() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);

  function updateGradeSelection(value) {
    gradeList[value].isChecked = !gradeList[value].isChecked;
    setAnchorEl(false);
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
        {Object.keys(gradeList).map((key) => (
          <>
            <input
              key={key}
              type="checkbox"
              onClick={() => updateGradeSelection(key)}
              checked={gradeList[key].isChecked}
              value={gradeList[key].value}
            />
            {gradeList[key].value}
            <br />
          </>
        ))}
      </Popover>
    </>
  );
}
