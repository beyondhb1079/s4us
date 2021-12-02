import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Typography } from '@mui/material';

const HomeSection = ({
  alignItems,
  direction,
  title,
  description,
  buttons,
  pic,
}) => (
  <Container sx={{ padding: 4 }}>
    <Grid container spacing={3} direction={direction} alignItems={alignItems}>
      <Grid item xs={12} sm={6}>
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
        <img
          src={pic}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </Grid>
    </Grid>
  </Container>
);

HomeSection.defaultProps = {
  alignItems: 'flex-start',
  direction: 'row',
  buttons: [],
};

HomeSection.propTypes = {
  alignItems: PropTypes.string,
  direction: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.element),
  pic: PropTypes.string.isRequired,
};

export default HomeSection;
