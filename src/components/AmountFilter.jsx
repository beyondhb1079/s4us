import React, { useState } from 'react';
import { Button, Popover, InputLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AmountTextField from './AmountTextField';

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    margin: theme.spacing(1),
    minWidth: 120,
    height: 57,
  },
}));

function displayFilter(label, value, onChange) {
  return (
    <>
      <InputLabel>{label}</InputLabel>
      <AmountTextField
        disabled={false}
        variation="outlined"
        {...{ value, onChange }}
      />
    </>
  );
}

export default function AmountFilter() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [values, setValues] = useState({});

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleChange = (index, val) =>
    setValues({ ...values, [index]: parseInt(val, 10) || '' });

  return (
    <>
      <Button
        variant="outlined"
        className={classes.buttonStyle}
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}>
        Amount
      </Button>
      <Popover
        id="amount-filter"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
        {displayFilter('Min Amount', values.min, (e) =>
          handleChange('min', e.target.value)
        )}
        {displayFilter('Max Amount', values.max, (e) =>
          handleChange('max', e.target.value)
        )}
      </Popover>
    </>
  );
}
