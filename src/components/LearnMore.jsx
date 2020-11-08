import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import logopic from '../img/blank.png';

export default function LearnMore() {
  return (
    <Container style={{ textAlign: 'left' }}>
      <Grid container spacing={2}>
        <Grid item>
          <img width="500" src={logopic} className="profilePic" alt="" />
        </Grid>
        <Grid item xs={12} sm={6} container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="h2" component="h2">
                For and by the Community
              </Typography>
              <Typography variant="body2" gutterBottom>
                Et has minim eltir intellegat. Mea aeterno elefiend antiopam ad,
                nam no suscipit quaerendum. At name mininum ponderum. Est audiam
                animal molestiate te.
              </Typography>
              <Link to="/about">
                <Button variant="outlined" color="primary">
                  Learn More
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
