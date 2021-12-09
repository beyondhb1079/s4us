import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Typography } from '@mui/material';

const HomeSection = ({
  alignItems,
  direction,
  title,
  main,
  description,
  buttons,
  pic,
}) => {
  const picSize = main ? '90%' : '80%';
  return (
    <Container sx={{ padding: 4 }}>
      <Grid container spacing={3} direction={direction} alignItems={alignItems}>
        <Grid item xs={12} sm={6}>
          <Typography variant={main ? 'h2' : 'h3'} component="h2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" paragraph>
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
              width: picSize,
              height: picSize,
              objectFit: 'contain',
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

HomeSection.defaultProps = {
  alignItems: 'flex-start',
  main: false,
  direction: 'row',
  buttons: [],
  description: '',
};

HomeSection.propTypes = {
  alignItems: PropTypes.string,
  direction: PropTypes.string,
  title: PropTypes.string.isRequired,
  main: PropTypes.bool,
  description: PropTypes.string,
  buttons: PropTypes.arrayOf(PropTypes.element),
  pic: PropTypes.string.isRequired,
};

export default HomeSection;
