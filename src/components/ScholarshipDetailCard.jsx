import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Box,
  Link,
  makeStyles,
  Typography,
  Chip,
} from '@material-ui/core';
import { Share, Send, Info } from '@material-ui/icons';
import ScholarshipAmount from '../types/ScholarshipAmount';
import ScholarshipEligibility from '../types/ScholarshipEligibility';

import ScholarshiDetailCardCell from './ScholarshipDetailCardCell';

const useStyles = makeStyles((theme) => ({
  name: {
    fontWeight: '500',
  },
  actionsWrapper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
    padding: `${theme.spacing(1)}px 0`,
  },
  applyBtn: {
    backgroundColor: '#3FB1B5',

    marginRight: theme.spacing(1),
  },
  description: {
    whiteSpace: 'pre-line',
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
    borderColor: '#3FB1B5',
  },
  reportBtn: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
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

  return (
    <Box>
      <Typography variant="h4" className={classes.name}>
        {name}
      </Typography>

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
        <ScholarshiDetailCardCell
          label="Deadline"
          text={deadline?.toLocaleDateString()}
        />
        <ScholarshiDetailCardCell
          label="Award Amount"
          text={amount?.toString()}
        />
        <ScholarshiDetailCardCell label="State" text={states?.join(', ')} />
      </Box>

      <Box className={classes.eligibilitiesWrapper}>
        <Typography
          variant="h6"
          component="h4"
          className={classes.sectionHeader}>
          Eligibility Requirements
        </Typography>

        <ScholarshiDetailCardCell label="GPA" text={eligibility?.GPA} />
        <ScholarshiDetailCardCell
          label="Demographic"
          text={eligibility?.ethnicities}
        />
        <ScholarshiDetailCardCell label="Majors" text={eligibility?.majors} />
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
      tags: PropTypes.arrayOf(PropTypes.string),
      states: PropTypes.arrayOf(PropTypes.string),
      eligibility: PropTypes.instanceOf(ScholarshipEligibility),
    }).isRequired,
  }).isRequired,
};
