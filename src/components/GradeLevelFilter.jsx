import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Popover,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GradeLevel from '../types/GradeLevel';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    height: theme.spacing(4),
  },
  popover: {
    padding: theme.spacing(2),
  },
}));

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
        endIcon={<ArrowDropDownIcon color="primary" />}>
        Grade
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
        <FormControl component="fieldset" className={classes.popover}>
          <FormGroup>
            {Object.entries(GradeLevel.values()).map(([val, stringRep]) => (
              <FormControlLabel
                key={val}
                control={
                  <Checkbox
                    color="primary"
                    checked={selectedGrades.has(val)}
                    onChange={() => toggleSelection(val)}
                    name="grade"
                  />
                }
                label={stringRep}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Popover>
    </>
  );
}
