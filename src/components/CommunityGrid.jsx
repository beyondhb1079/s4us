import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import logopic from '../img/logo.png';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
  image: {
    width: 750,
    height: 250,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function CommunityGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={2} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <h3>COMMUNITY CONTRIBUTORS</h3>
                <h1>Join and support the community</h1>
                <Typography variant="body2" gutterBottom>
                  Et has minim eltir intellegat. Mea aeterno elefiend antiopam ad, nam
                  no suscipit quaerendum. At name mininum ponderum. Est audiam animal molestiate te.
                  Et has minim eltir intellegat. Mea aeterno elefiend antiopam ad, nam
                  no suscipit quaerendum. At name mininum ponderum. Est audiam animal molestiate te.
                </Typography>
                <Link to="/home">
                  <Button variant="contained" color="Transparent">Submit A Scholarship</Button>
                </Link>
              </Grid>

            </Grid>
          </Grid>
          <Grid item>
            <img width="500" src={logopic} className="profilePic"></img>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
