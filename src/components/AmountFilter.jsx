import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Popover, InputLabel, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  ArrowDropDown as ArrowDropDownIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import AmountTextField from './AmountTextField';

const useStyles = makeStyles((theme) => ({
  buttonStyle: {
    margin: theme.spacing(1),
    height: theme.spacing(4),
  },
  filterStyle: { margin: theme.spacing(1) },
  labelStyle: { paddingLeft: theme.spacing(1) },
  dashStyle: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function AmountFilter(props) {
  const classes = useStyles();
  const { min, max, onMinChange, onMaxChange } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const error = max > 0 && max < min;

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
              error={error}
              value={min || ''}
              onChange={onMinChange}
            />
          </Grid>
          <Grid item className={classes.dashStyle}>
            <RemoveIcon />
          </Grid>
          <Grid item className={classes.filterStyle}>
            <InputLabel className={classes.labelStyle}>Max Amount</InputLabel>
            <AmountTextField value={max || ''} onChange={onMaxChange} />
          </Grid>
        </Grid>
      </Popover>
    </>
  );
}

AmountFilter.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onMinChange: PropTypes.func.isRequired,
  onMaxChange: PropTypes.func.isRequired,
};
