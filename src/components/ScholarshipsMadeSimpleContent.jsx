import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import logopic from '../img/blank.png';
import LoginButton from './LoginButton';

function ContentText(tab) {
  return (
    <>
      <Typography variant="overline" component="h6" gutterBottom>
        {tab === 'students' ? 'students' : 'community contributor'}
      </Typography>
      <Typography variant="h2" component="h2" gutterBottom>
        {tab === 'students'
          ? 'Stress-free scholarships'
          : 'Join and Support the Community'}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Et has minim eltir intellegat. Mea aeterno elefiend antiopam ad, nam no
        suscipit quaerendum. At name mininum ponderum. Est audiam animal
        molestiate te.
      </Typography>
    </>
  );
}

function ContentDiplay(user) {
  if (user === 'students') {
    return (
      <>
        <LoginButton />
        <Link to="/scholarships">
          <Button
            variant="outlined"
            color="primary"
            style={{ marginLeft: '20px' }}>
            Find Scholarships
          </Button>
        </Link>
      </>
    );
  }
  return (
    <>
      <Link to="/home">
        <Button variant="outlined" color="primary">
          Submit Scholarship
        </Button>
      </Link>
    </>
  );
}

export default function ScholarshipsMadeSimpleContent(props) {
  const { user } = props;
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs>
          {ContentText(user)}
          {ContentDiplay(user)}
        </Grid>
        <Grid item>
          <img width="400" src={logopic} className="profilePic" alt="" />
        </Grid>
      </Grid>
    </>
  );
}

ScholarshipsMadeSimpleContent.propTypes = {
  user: PropTypes.number.isRequired,
};
