import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Grid,
  Typography,
  Paper,
  Link as MuiLink,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// TODO(issues/31): styling according to design
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  link: {
    textDecoration: 'none',
  },
  paper: {
    padding: theme.spacing(3),
  },
  item: {},
}));

function ScholarshipList({ scholarships }) {
  const classes = useStyles();
  const scholarshipItems = scholarships.map(({ id, data }) => (
    <Grid item xs={12} md={6} className={classes.item}>
      <Link to={`/scholarships/${id}`} key={id} className={classes.link}>
        <Paper className={classes.paper} elevation={0}>
          <Typography variant="h5">{data.name}</Typography>
          <Typography variant="h6">{data.amount}</Typography>
          <Typography variant="subtitle1">
            {data.deadline.toDateString()}
          </Typography>
          <Typography variant="body" display="block">
            {data.description}
          </Typography>
          <Button
            component={MuiLink}
            href={data.website}
            variant="contained"
            color="primary">
            Apply
          </Button>
        </Paper>
      </Link>
    </Grid>
  ));

  return (
    <Grid container spacing={3} className={classes.root}>
      {scholarshipItems}
    </Grid>
  );
}

ScholarshipList.propTypes = {
  scholarships: PropTypes.arrayOf(PropTypes.object),
};
ScholarshipList.defaultProps = {
  scholarships: [],
};

export default ScholarshipList;
