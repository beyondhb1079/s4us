import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import { Container, Grid, Typography } from '@mui/material';

const useStyles = makeStyles(() => ({
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
}));

export default function HomeSection(props) {
  const classes = useStyles();
  const { alignItems, direction, tab, title, description, buttons, pic } =
    props;

  return (
    <Container sx={{ padding: 4 }}>
      <Grid container spacing={2} direction={direction} alignItems={alignItems}>
        <Grid item xs={12} sm={6}>
          <Typography variant="overline" component="h6" gutterBottom>
            {tab}
          </Typography>
          <Typography variant="h2" component="h2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" paragraph>
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
