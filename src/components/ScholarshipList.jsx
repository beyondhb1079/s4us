import React from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  link: {
    textDecoration: 'none',
  },
  item: {
    color: '#000',
  },
}));

function ScholarshipList(props) {
  const classes = useStyles();
  const { scholarships } = props;
  const scholarshipList = Object.entries(scholarships).map(([id, item]) => (
    <Link to={`/scholarships/${id}`} key={id} className={classes.link}>
      <ListItem divider alignItems="flex-start" className={classes.item}>
        <ListItemText primary={item.name} secondary={item.school} />
        <ListItemText primary={item.amount} />
        <ListItemText primary={item.deadline} />
      </ListItem>
    </Link>
  ));

  return (
    <List className={classes.root}>{scholarshipList}</List>
  );
}

ScholarshipList.propTypes = {
  scholarships: PropTypes.objectOf(PropTypes.object),
};
ScholarshipList.defaultProps = {
  scholarships: [],
};

export default ScholarshipList;
