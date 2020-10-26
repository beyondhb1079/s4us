import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  card: {},
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
