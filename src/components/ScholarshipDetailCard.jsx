import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Box,
  Link,
  makeStyles,
  Typography,
  Chip,
  Grid,
  Divider,
} from '@material-ui/core';
import { Share, Send, Info } from '@material-ui/icons';
import ScholarshipAmount from '../types/ScholarshipAmount';

const useStyles = makeStyles((theme) => ({
  actionsWrapper: {
    margin: `${theme.spacing(3)}px 0`,
    padding: `${theme.spacing(1)}px 0`,
  },
  applyBtn: {
    marginRight: theme.spacing(1),
  },
  description: {
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: theme.spacing(2),
  },
  sectionHeader: {
    fontWeight: '500',
    color: 'rgb(100, 100, 100)',
    marginBottom: theme.spacing(2),
  },
  propertiesWrapper: {
    color: 'rgb(100, 100, 100)',
    marginTop: theme.spacing(6),
  },
  tag: {
    marginRight: theme.spacing(2),
    color: 'rgb(100, 100, 100)',
  },
  reportBtn: {
    margin: `${theme.spacing(5)}px 0`,
  },
  divider: {
    margin: `${theme.spacing(1.5)}px 0`,
  },
}));

// TODO(issues/358): Style this.
export default function ScholarshipDetailCard({ scholarship }) {
  const classes = useStyles();
  const {
    name,
    organization,
    amount,
    deadline,
    website,
    description,
    tags,
    states,
    eligibility,
  } = scholarship.data;

  function DetailCardCell({ label, text }) {
    return (
      <Grid container justify="space-between">
        <Grid item xs={12} sm={3}>
          <Typography component="p">{label}</Typography>
        </Grid>
        <Grid item className={classes.textWrapper} xs={12} sm={3}>
          <Typography component="p">{text}</Typography>
        </Grid>
      </Grid>
    );
  }

  DetailCardCell.propTypes = {
    label: PropTypes.string.isRequired,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };

  return (
    <Box>
      <Typography variant="h4">{name}</Typography>

      <Typography variant="h5">{organization}</Typography>

      <Box className={classes.actionsWrapper}>
        <Button
          component={Link}
          href={website}
          variant="contained"
          color="primary"
          className={classes.applyBtn}
          startIcon={<Send />}>
          Apply
        </Button>

        <Button
          variant="outlined"
          className={classes.shareBtn}
          startIcon={<Share />}>
          Share
        </Button>
      </Box>

      <Typography
        gutterBottom
        variant="body1"
        component="p"
        className={classes.description}>
        {description}
      </Typography>

      <Box>
        <DetailCardCell
          label="Deadline"
          text={deadline?.toLocaleDateString() || 'Unknown'}
        />
        <Divider light className={classes.divider} />
        <DetailCardCell
          label="Award Amount"
          text={amount?.toString() || 'Unknown'}
        />
        <Divider light className={classes.divider} />
        <DetailCardCell label="State" text={states?.join(', ') || 'All'} />
        <Divider light className={classes.divider} />
      </Box>

      <Box className={classes.propertiesWrapper}>
        <Typography
          variant="h6"
          component="h4"
          className={classes.sectionHeader}>
          Eligibility Requirements
        </Typography>
        <DetailCardCell label="GPA" text={eligibility?.gpa || 'None'} />
        <Divider light className={classes.divider} />
        <DetailCardCell
          label="Demographic"
          text={eligibility?.ethnicities?.join(', ') || 'All'}
        />
        <Divider light className={classes.divider} />
        <DetailCardCell
          label="Majors"
          text={eligibility?.majors?.join(', ') || 'All'}
        />
        <Divider light className={classes.divider} />{' '}
      </Box>

      <Box className={classes.propertiesWrapper}>
        <Typography
          variant="h6"
          component="h4"
          className={classes.sectionHeader}>
          Tags
        </Typography>

        <Grid container>
          {tags?.map(({ title, id }) => (
            <Chip
              label={title}
              variant="outlined"
              color="primary"
              className={classes.tag}
              key={id}
            />
          ))}
        </Grid>
      </Box>

      <Chip
        component={Link}
        icon={<Info />}
        className={classes.reportBtn}
        label="Report Issue"
      />
    </Box>
  );
}

ScholarshipDetailCard.propTypes = {
  scholarship: PropTypes.shape({
    id: PropTypes.string.isRequired,
    data: PropTypes.shape({
      name: PropTypes.string,
      organization: PropTypes.string,
      amount: PropTypes.instanceOf(ScholarshipAmount),
      description: PropTypes.string,
      deadline: PropTypes.instanceOf(Date),
      website: PropTypes.string,
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
        })
      ),
      states: PropTypes.arrayOf(PropTypes.string),
      eligibility: PropTypes.shape({
        gpa: PropTypes.number,
        ethnicities: PropTypes.arrayOf(PropTypes.string),
        majors: PropTypes.arrayOf(PropTypes.string),
      }),
    }).isRequired,
  }).isRequired,
};
