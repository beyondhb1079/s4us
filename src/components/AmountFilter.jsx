import React, { useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import PropTypes from 'prop-types';
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
  filterStyle: { margin: theme.spacing(1) },
  labelStyle: { paddingLeft: theme.spacing(1) },
  dashStyle: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  helperStyle: {
    padding: `0 0 ${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
}));

export default function AmountFilter(props) {
  const classes = useStyles();
  const { amountFilterVals } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const location = useLocation();
  const history = useHistory();

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const error =
    amountFilterVals.max > 0 && amountFilterVals.max <= amountFilterVals.min;

  const setMinMax = (index, val) => {
    history.push({
      search: queryString.stringify({
        ...queryString.parse(location.search),
        [index]: val,
      }),
    });
  };

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
              value={amountFilterVals.min || ''}
              onChange={(e) =>
                setMinMax('min', parseInt(e.target.value, 10) || 0)
              }
            />
          </Grid>
          <Grid item className={classes.dashStyle}>
            <RemoveIcon />
          </Grid>
          <Grid item className={classes.filterStyle}>
            <InputLabel className={classes.labelStyle}>Max Amount</InputLabel>
            <AmountTextField
              value={amountFilterVals.max || ''}
              onChange={(e) =>
                setMinMax('max', parseInt(e.target.value, 10) || 0)
              }
            />
          </Grid>
        </Grid>
      </Popover>
    </>
  );
}

AmountFilter.propTypes = {
  amountFilterVals: PropTypes.objectOf(PropTypes.number).isRequired,
};
