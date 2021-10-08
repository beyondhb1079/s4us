import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  description: {
    marginBottom: theme.spacing(3),
  },
}));

export default function HomeSection(props) {
  const classes = useStyles();
  const { alignItems, direction, tab, title, description, buttons, pic } =
    props;

  return (
    <Container className={classes.root}>
      <Grid container spacing={2} direction={direction} alignItems={alignItems}>
        <Grid item xs={12} sm={6}>
          <Typography variant="overline" component="h6" gutterBottom>
            {tab}
          </Typography>
          <Typography variant="h2" component="h2" gutterBottom>
            {title}
          </Typography>
          <Typography
            variant="body2"
            gutterBottom
            className={classes.description}
          >
            {description}
          </Typography>
          <Grid container spacing={2}>
            {buttons.map((button, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Grid item key={i}>
                {button}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <img className={classes.img} src={pic} alt="" />
        </Grid>
      </Grid>
    </Container>
  );
}

HomeSection.defaultProps = {
  alignItems: 'flex-start',
  direction: 'row',
  tab: '',
  buttons: [],
};

HomeSection.propTypes = {
  alignItems: PropTypes.string,
  direction: PropTypes.string,
  tab: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.element),
  pic: PropTypes.string.isRequired,
};
