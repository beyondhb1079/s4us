import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    color: 'rgba(0, 0, 0, 0.6)',
    padding: `${theme.spacing(1.5)}px 0`,
    borderBottom: '1px solid #EEEEEE',
  },
  labelWrapper: {
    '& p': {
      fontWeight: 'normal',
    },
  },
  textWrapper: {
    '& p': {
      textAlign: 'right',
      fontWeight: '500',
    },
  },
}));

const ScholarshiDetailCardCell = ({ label, text }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={4} className={classes.labelWrapper}>
        <Typography variant="h6" component="p">
          {label}
        </Typography>
      </Grid>
      <Grid item xs={8} className={classes.textWrapper}>
        <Typography variant="h6" component="p">
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
};

ScholarshiDetailCardCell.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string,
};

ScholarshiDetailCardCell.defaultProps = {
  label: 'Label',
  text: 'text',
};

export default ScholarshiDetailCardCell;
