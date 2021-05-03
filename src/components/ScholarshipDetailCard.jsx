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
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    padding: `${theme.spacing(1)}px 0`,
  },
  applyBtn: {
    marginRight: theme.spacing(1),
  },
  description: {
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: theme.spacing(2),
  },
  groupCellWithoutHeader: {
    marginBottom: theme.spacing(2),
  },
  sectionHeader: {
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.6)',
  },
  eligibilitiesWrapper: {
    marginTop: theme.spacing(6),
    '& h4': {
      marginBottom: theme.spacing(2),
    },
  },
  tagsWrapper: {
    marginTop: theme.spacing(4),
  },
  tagItemsWrapper: {
    flexDirection: 'row',
    paddingTop: theme.spacing(2),
  },
  tag: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    color: '#000',
  },
  reportBtn: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
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
      <>
        <Grid container justify="space-between">
          <Grid item>
            <Typography component="p">{label}</Typography>
          </Grid>
          <Grid item className={classes.textWrapper}>
            <Typography component="p">{text}</Typography>
          </Grid>
        </Grid>
        <Divider light className={classes.divider} />
      </>
    );
  }

  DetailCardCell.propTypes = {
    label: PropTypes.string.isRequired,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };
  DetailCardCell.defaultProps = {
    text: null,
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

      <Box className={classes.groupCellWithoutHeader}>
        <DetailCardCell
          label="Deadline"
          text={deadline?.toLocaleDateString()}
        />
        <DetailCardCell label="Award Amount" text={amount?.toString()} />
        <DetailCardCell label="State" text={states?.join(', ')} />
      </Box>

      <Box className={classes.eligibilitiesWrapper}>
        <Typography
          variant="h6"
          component="h4"
          className={classes.sectionHeader}>
          Eligibility Requirements
        </Typography>

        <DetailCardCell label="GPA" text={eligibility?.GPA} />
        <DetailCardCell
          label="Demographic"
          text={eligibility?.ethnicities?.join(', ')}
        />
        <DetailCardCell label="Majors" text={eligibility?.majors?.join(', ')} />
      </Box>

      <Box className={classes.tagsWrapper}>
        <Typography
          variant="h6"
          component="h4"
          className={classes.sectionHeader}>
          Tags
        </Typography>

        <Box className={classes.tagItemsWrapper}>
          {tags?.map(({ title, id }) => (
            <Chip
              label={title}
              variant="outlined"
              color="primary"
              className={classes.tag}
              key={id}
            />
          ))}
        </Box>
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
        GPA: PropTypes.number,
        ethnicities: PropTypes.arrayOf(PropTypes.string),
        majors: PropTypes.arrayOf(PropTypes.string),
      }),
    }).isRequired,
  }).isRequired,
};
