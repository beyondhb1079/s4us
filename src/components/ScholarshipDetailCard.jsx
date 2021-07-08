import React from 'react';
import { useHistory } from 'react-router-dom';
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
import { genMailToLink, withDeviceInfo } from '../lib/mail';
import ScholarshipAmount from '../types/ScholarshipAmount';
import { BRAND_NAME } from '../config/constants';

const useStyles = makeStyles((theme) => ({
  actionSection: {
    margin: `${theme.spacing(3)}px 0`,
    padding: `${theme.spacing(1)}px 0`,
  },
  cardDetailText: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
  },
  applyBtn: {
    marginRight: theme.spacing(1),
  },
  description: {
    marginBottom: theme.spacing(2),
  },
  sectionHeader: {
    fontWeight: '500',
    marginBottom: theme.spacing(2),
  },
  propertySection: {
    marginTop: theme.spacing(6),
  },
  tag: {
    marginRight: theme.spacing(2),
    color: '#000',
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
  const history = useHistory();

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
    authorEmail,
  } = scholarship.data;

  const URL = `https://${window.location.hostname}/scholarships/${scholarship.id}`;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const shareFn = () => {
    const data = {
      title: `${amount?.toString()} - ${name} | ${BRAND_NAME}`,
      text: `${amount?.toString()} - ${name} | ${BRAND_NAME} \n ${deadline?.toLocaleDateString()}\n`,
      url: URL,
    };

    if (navigator.share) {
      navigator
        .share(data)
        // eslint-disable-next-line no-console
        .then(() => console.log('Thanks for sharing!'))
        // eslint-disable-next-line no-console
        .catch(console.error);
    } else {
      history.replace({
        state: { showShareDialog: true, shareData: data },
      });
    }
  };

  function DetailCardCell({ label, text, bottom, top }) {
    return (
      <>
        {top && <Divider light className={classes.divider} />}
        <Grid container justify="space-between">
          <Grid item xs={12} sm>
            <Typography component="p">{label}</Typography>
          </Grid>
          <Grid item className={classes.cardDetailText} xs={12} sm>
            <Typography component="p">{text}</Typography>
          </Grid>
        </Grid>
        {bottom && <Divider light className={classes.divider} />}
      </>
    );
  }

  DetailCardCell.propTypes = {
    label: PropTypes.string.isRequired,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    bottom: PropTypes.bool,
    top: PropTypes.bool,
  };
  DetailCardCell.defaultProps = {
    bottom: false,
    top: false,
  };

  return (
    <Box>
      <Typography variant="h4">{name}</Typography>
      <Typography variant="h5">{organization}</Typography>
      <Box className={classes.actionSection}>
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
          startIcon={<Share />}
          onClick={shareFn}>
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
          bottom
        />
        <DetailCardCell
          label="Award Amount"
          text={amount?.toString() || 'Unknown'}
          bottom
        />
        <DetailCardCell
          label="State"
          text={states?.join(', ') || 'All'}
          bottom
        />
      </Box>
      <Box className={classes.propertySection}>
        <Typography
          variant="h6"
          component="h4"
          className={classes.sectionHeader}>
          Eligibility Requirements
        </Typography>
        <DetailCardCell label="GPA" text={eligibility?.gpa || 'None'} bottom />
        <DetailCardCell
          label="Demographic"
          text={eligibility?.ethnicities?.join(', ') || 'All'}
          bottom
        />
        <DetailCardCell
          label="Majors"
          text={eligibility?.majors?.join(', ') || 'All'}
          bottom
        />
      </Box>
      <Box className={classes.propertySection}>
        <Typography
          variant="h6"
          component="h4"
          className={classes.sectionHeader}>
          Tags
        </Typography>

        <Grid container>
          {!tags
            ? 'None'
            : tags.map(({ title, id }) => (
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
        href={genMailToLink({
          subject: `Report Issue for ${name}`,
          bcc: authorEmail,
          body: withDeviceInfo(
            `Please describe the issue for the scholarship located at ${URL}.`
          ),
        })}
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
      authorEmail: PropTypes.string,
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
