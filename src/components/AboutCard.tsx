import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface AboutCardProps {
  img: string;
  name: string;
  description: string | JSX.Element;
}

const AboutCard = ({ img, name, description }: AboutCardProps): JSX.Element => (
  <Card sx={{ height: '100%' }}>
    <CardMedia
      image={img}
      title={`picture of ${name}`}
      sx={{ backgroundSize: 'contain', height: 250 }}
    />
    <CardContent>
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body2">{description}</Typography>
    </CardContent>
  </Card>
);

export default AboutCard;
