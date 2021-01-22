import React, { useState } from 'react';
import { Button, Popover, InputLabel, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RemoveIcon from '@material-ui/icons/Remove';
import AmountTextField from './AmountTextField';

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    margin: theme.spacing(1),
    maxWidth: 120,
    height: 57,
  },
  labelStyle: { paddingLeft: theme.spacing(1) },
  dashStyle: { margin: '45px auto auto' },
  filterStyle: { margin: '10px 0' },
}));

export default function AmountFilter() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [values, setValues] = useState({});

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleChange = (index, val) =>
    setValues({ ...values, [index]: parseInt(val, 10) || '' });

  function displayFilter(label, value, onChange) {
    return (
      <Grid item className={classes.filterStyle}>
        <InputLabel className={classes.labelStyle}>{label}</InputLabel>
        <AmountTextField
          disabled={false}
          variation="outlined"
          {...{ value, onChange }}
        />
      </Grid>
    );
  }

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
        transformOrigin={{ vertical: -5, horizontal: 'left' }}>
        <Grid container>
          {displayFilter('Min Amount', values.min, (e) =>
            handleChange('min', e.target.value)
          )}
          <Grid item className={classes.dashStyle}>
            <RemoveIcon />
          </Grid>
          {displayFilter('Max Amount', values.max, (e) =>
            handleChange('max', e.target.value)
          )}
        </Grid>
      </Popover>
    </>
  );
}
