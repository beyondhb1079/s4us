import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  card: {
    height: '100%',
  },
  media: {
    height: 200,
  },
});

function AboutCard(props) {
  const classes = useStyles();
  const { img, name, description } = props;

  return (
    <Card className={classes.card}>
      <CardMedia
        image={img}
        title={`picture of ${name}`}
        className={classes.media}
      />
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
}

AboutCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
};

export default AboutCard;
