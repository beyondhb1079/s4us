import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const AboutCard = ({ img, name, description }) => (
  <Card sx={{ height: '100%' }}>
    <CardMedia
      image={img}
      title={`picture of ${name}`}
      sx={{ backgroundSize: contain, height: 250 }}
    />
    <CardContent>
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body2">{description}</Typography>
    </CardContent>
  </Card>
);

AboutCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
};

export default AboutCard;
