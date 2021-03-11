import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Popover } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  popOverWindow: {
    margin: theme.spacing(1),
    minWidth: '250px',
    maxWidth: '500px',
  },
}));

const gradeOptions = [
  { title: '12th - High School' },
  { title: 'College Freshman' },
  { title: 'College Sophomore' },
  { title: 'College Junior' },
  { title: 'College Senior' },
  { title: '5th Year' },
  { title: 'Post Grad' },
];

export default function GradeLevelFilter() {
  const classes = useStyles();

  return (
    <>
      <Autocomplete
        className={classes.popOverWindow}
        multiple
        limitTags={1}
        options={gradeOptions}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label=" Grade"
            placeholder="Others"
          />
        )}
      />
    </>
  );
}
