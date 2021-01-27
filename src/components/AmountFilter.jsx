import React, { useState } from 'react';
import { Button, Popover, InputLabel, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RemoveIcon from '@material-ui/icons/Remove';
import AmountTextField from './AmountTextField';

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    margin: theme.spacing(1),
    height: theme.spacing(4),
  },
  filterStyle: { margin: `${theme.spacing(1)}px 0` },
  labelStyle: { paddingLeft: theme.spacing(1) },
  dashStyle: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function AmountFilter() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [values, setValues] = useState({ min: 0, max: 0 });

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleChange = (index, val) =>
    setValues({ ...values, [index]: parseInt(val, 10) || '' });

  return (
    <>
      <Button
        variant="outlined"
        className={classes.buttonStyle}
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon color="primary" />}>
        Amount
      </Button>
      <Popover
        id="amount-filter"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
        <Grid container>
          <Grid item className={classes.filterStyle}>
            <InputLabel className={classes.labelStyle}>Min Amount</InputLabel>
            <AmountTextField
              value={values.min}
              onChange={(e) => handleChange('min', e.target.value)}
            />
          </Grid>
          <Grid item className={classes.dashStyle}>
            <RemoveIcon />
          </Grid>
          <Grid item className={classes.filterStyle}>
            <InputLabel className={classes.labelStyle}>Max Amount</InputLabel>
            <AmountTextField
              value={values.max}
              onChange={(e) => handleChange('max', e.target.value)}
            />
          </Grid>
        </Grid>
      </Popover>
    </>
  );
}
