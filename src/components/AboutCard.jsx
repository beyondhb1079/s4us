import React from 'react';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  card: {
    height: 300,
    width: '80%',
  },
  media: {
    height: 150,
  },
});

function AboutCard(props) {
  const classes = useStyles();
  const { img, name, description } = props;

  return (
    <StylesProvider injectFirst>
      <Card className={classes.card}>
        <CardMedia image={img} title={`picture of ${name}`} className={classes.media} />
        <CardContent>
          <Typography variant="h6">
            {name}
          </Typography>
          <Typography variant="body">
            {description}
          </Typography>
        </CardContent>
      </Card>
    </StylesProvider>
  );
}

AboutCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default AboutCard;
