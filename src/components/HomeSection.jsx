import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
}));

export default function ScholarshipsMadeSimpleContent(props) {
  const classes = useStyles();
  const { direction, tab, title, description, button, pic } = props;
  return (
    <Grid container spacing={2} direction={direction}>
      <Grid item xs={12} sm={6}>
        <Typography variant="overline" component="h6" gutterBottom>
          {tab}
        </Typography>
        <Typography variant="h2" component="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {description}
        </Typography>
        {button}
      </Grid>
      <Grid item xs={12} sm={6}>
        <img className={classes.img} src={pic} alt="" />
      </Grid>
    </Grid>
  );
}

ScholarshipsMadeSimpleContent.propTypes = {
  user: PropTypes.number.isRequired,
};
