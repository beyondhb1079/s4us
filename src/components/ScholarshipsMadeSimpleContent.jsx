import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import logopic from '../img/blank.png';
import LoginButton from './LoginButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
}));

function ButtonList(user) {
  return (
    <>
      {user === 'students' && <LoginButton />}
      <Button
        variant="outlined"
        color="primary"
        component={Link}
        style={{ marginLeft: '20px' }}
        to={user === 'students' ? '/scholarships' : '/new'}
        buttonProperties>
        {user === 'students' ? 'Find Scholarships' : 'Submit A Scholarship'}
      </Button>
    </>
  );
}

export default function ScholarshipsMadeSimpleContent(props) {
  const classes = useStyles();
  const { user } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="overline" component="h6" gutterBottom>
          {user === 'students' ? 'students' : 'community contributor'}
        </Typography>
        <Typography variant="h2" component="h2" gutterBottom>
          {user === 'students'
            ? 'Stress-free scholarships'
            : 'Join and Support the Community'}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Et has minim eltir intellegat. Mea aeterno elefiend antiopam ad, nam
          no suscipit quaerendum. At name mininum ponderum. Est audiam animal
          molestiate te.
        </Typography>
        {ButtonList(user)}
      </Grid>
      <Grid item xs={12} sm={6}>
        <img className={classes.img} src={logopic} alt="" />
      </Grid>
    </Grid>
  );
}

ScholarshipsMadeSimpleContent.propTypes = {
  user: PropTypes.number.isRequired,
};
