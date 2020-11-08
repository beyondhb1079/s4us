import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import logopic from '../img/logo.png';
import LoginButton from './LoginButton';

export default function ScholarshipsMadeSimpleGrid() {
  return (
    <Container style={{ textAlign: 'left' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="h6" component="h6">
                STUDENTS
              </Typography>
              <Typography variant="h2" component="h2">
                Stress-free scholarships
              </Typography>
              <Typography variant="body2" gutterBottom>
                Et has minim eltir intellegat. Mea aeterno elefiend antiopam ad,
                nam no suscipit quaerendum. At name mininum ponderum. Est audiam
                animal molestiate te. Et has minim eltir intellegat. Mea aeterno
                elefiend antiopam ad, nam no suscipit quaerendum. At name
                mininum ponderum. Est audiam animal molestiate te.
              </Typography>
              <LoginButton />
              <Link to="/scholarships">
                <Button variant="outlined" color="primary">
                  Find Scholarships
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <img width="500" src={logopic} className="profilePic" />
        </Grid>
      </Grid>
    </Container>
  );
}
