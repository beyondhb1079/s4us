import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import {
  Button,
  Popover,
  InputLabel,
  Grid,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RemoveIcon from '@material-ui/icons/Remove';
import AmountTextField from './AmountTextField';
import AmountFilterValidation from '../validation/AmountFilterValidation';

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

export default function AmountFilter() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const formik = useFormik({
    initialValues: {
      min: 0,
      max: 0,
    },
    validationSchema: AmountFilterValidation,
  });

  useEffect(() => {
    const timeoutId = setTimeout(
      () => console.log(`${formik.values.min} ${formik.values.max}`),
      5000
    );
    return () => clearTimeout(timeoutId);
  }, [formik.values.min, formik.values.max]);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  function handleChange(index, val) {
    formik.setFieldValue(index, parseInt(val, 10) || 0);
  }

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
              error={formik.errors.min}
              value={formik.values.min || ''}
              onChange={(e) => handleChange('min', e.target.value)}
            />
          </Grid>
          <Grid item className={classes.dashStyle}>
            <RemoveIcon />
          </Grid>
          <Grid item className={classes.filterStyle}>
            <InputLabel className={classes.labelStyle}>Max Amount</InputLabel>
            <AmountTextField
              value={formik.values.max || ''}
              onChange={(e) => handleChange('max', e.target.value)}
            />
          </Grid>
        </Grid>
        <FormHelperText error className={classes.helperStyle}>
          {formik.errors.min}
        </FormHelperText>
      </Popover>
    </>
  );
}
