import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import logopic from '../img/blank.png';

const useStyles = makeStyles((theme) => ({
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  context: {
    alignSelf: 'center',
  },
}));

export default function LearnMore() {
  const classes = useStyles();
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} container>
          <img className={classes.img} src={logopic} alt="" />
        </Grid>
        <Grid item xs={12} sm={6} container className={classes.context}>
          <Grid item>
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
    </Container>
  );
}
