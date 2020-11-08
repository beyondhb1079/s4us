import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import logopic from '../img/blank.png';
import LoginButton from './LoginButton';

function ContentDiplay(user) {
  if (user === 0) {
    return (
      <div>
        <Typography variant="h6" component="h6">
          STUDENTS
        </Typography>
        <Typography variant="h2" component="h2">
          Stress-free scholarships
        </Typography>
        <Typography variant="body2" gutterBottom>
          Et has minim eltir intellegat. Mea aeterno elefiend antiopam ad, nam
          no suscipit quaerendum. At name mininum ponderum. Est audiam animal
          molestiate te.
        </Typography>
        <LoginButton />
        <Link to="/scholarships">
          <Button variant="outlined" color="primary">
            Find Scholarships
          </Button>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <Typography variant="h6" component="h6">
        COMMUNITY CONTRIBUTOR
      </Typography>
      <Typography variant="h2" component="h2">
        Join and Support the Community
      </Typography>
      <Typography variant="body2" gutterBottom>
        Et has minim eltir intellegat. Mea aeterno elefiend antiopam ad, nam no
        suscipit quaerendum. At name mininum ponderum. Est audiam animal
        molestiate te.
      </Typography>
      <Link to="/home">
        <Button variant="outlined" color="primary">
          Submit Scholarship
        </Button>
      </Link>
    </div>
  );
}

export default function ScholarshipsMadeSimpleGrid(props) {
  const { user } = props;
  return (
    <Container style={{ textAlign: 'left' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              {ContentDiplay(user)}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <img width="500" src={logopic} className="profilePic" alt="" />
        </Grid>
      </Grid>
    </Container>
  );
}

ScholarshipsMadeSimpleGrid.propTypes = {
  user: PropTypes.number.isRequired,
};
