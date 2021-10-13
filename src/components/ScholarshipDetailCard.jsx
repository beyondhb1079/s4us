import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import {
  Info as InfoIcon,
  Send as SendIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { genMailToLink, withDeviceInfo } from '../lib/mail';
import ScholarshipAmount from '../types/ScholarshipAmount';
import { BRAND_NAME } from '../config/constants';

const useStyles = makeStyles((theme) => ({
  detailSection: {
    padding: theme.spacing(3),
  },
  actionSection: {
    margin: `${theme.spacing(3)} 0`,
    padding: `${theme.spacing(1)} 0`,
  },
  cardDetailText: {
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right',
    },
  },
  applyBtn: {
    marginRight: theme.spacing(1),
  },
  propertySection: {
    marginTop: theme.spacing(6),
  },
  tag: {
    marginRight: theme.spacing(2),
    color: '#000',
  },
  reportBtn: {
    margin: `${theme.spacing(5)} 0`,
  },
  divider: {
    margin: `${theme.spacing(1.5)} 0`,
  },
}));

export default function ScholarshipDetailCard({ scholarship, preview }) {
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
    requirements,
    author,
  } = scholarship.data;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const shareFn = () => {
    const URL = `https://${window.location.hostname}/scholarships/${scholarship.id}`;
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
        <Grid container justifyContent="space-between">
          <Grid item xs={12} sm>
            <Typography>{label}</Typography>
          </Grid>
          <Grid item className={classes.cardDetailText} xs={12} sm>
            <Typography>{text}</Typography>
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
    <Card className={classes.detailSection}>
      <Typography variant="h4">{name}</Typography>
      <Typography variant="h5" gutterBottom>
        {organization}
      </Typography>
      {preview && (
        <Link href="#" underline="always" onClick={(e) => e.preventDefault()}>
          {website}
        </Link>
      )}

      <Box className={classes.actionSection}>
        <Button
          component={Link}
          href={website}
          target="_blank"
          variant="contained"
          color="primary"
          className={classes.applyBtn}
          startIcon={<SendIcon />}>
          Apply
        </Button>
        <Button
          variant="outlined"
          startIcon={<ShareIcon />}
          onClick={shareFn}
          disabled={scholarship.id === undefined}>
          Share
        </Button>
      </Box>

      <Typography paragraph>{description}</Typography>
      <Box>
        <DetailCardCell
          label="Deadline"
          text={deadline?.toLocaleDateString() || 'Unknown'}
          bottom
        />
        <DetailCardCell
          label="Award Amount"
          text={
            preview
              ? new ScholarshipAmount(amount.type, amount).toString()
              : amount?.toString() || 'Unknown'
          }
          bottom
        />
        <DetailCardCell
          label="State"
          text={requirements?.states?.join(', ') || 'All'}
          bottom
        />
      </Box>
      <Box className={classes.propertySection}>
        <Typography variant="h5" component="h4" gutterBottom>
          Eligibility Requirements
        </Typography>
        <DetailCardCell
          label="GPA"
          text={requirements?.gpa?.toFixed(1) || 'All'}
          bottom
        />
        <DetailCardCell
          label="Demographic"
          text={requirements?.ethnicities?.join(', ') || 'All'}
          bottom
        />
        <DetailCardCell
          label="Majors"
          text={requirements?.majors?.join(', ') || 'All'}
          bottom
        />
      </Box>
      <Box className={classes.propertySection}>
        <Typography variant="h5" component="h4" gutterBottom>
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
          bcc: author?.email,
          body: withDeviceInfo(
            `Please describe the issue for the scholarship located at ${URL}.`
          ),
        })}
        icon={<InfoIcon />}
        className={classes.reportBtn}
        label="Report Issue"
      />
    </Card>
  );
}

ScholarshipDetailCard.propTypes = {
  scholarship: PropTypes.shape({
    id: PropTypes.string,
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
      author: PropTypes.shape({
        email: PropTypes.string,
        id: PropTypes.string,
      }),
      requirements: PropTypes.shape({
        gpa: PropTypes.number,
        ethnicities: PropTypes.arrayOf(PropTypes.string),
        majors: PropTypes.arrayOf(PropTypes.string),
        states: PropTypes.arrayOf(PropTypes.string),
      }),
    }).isRequired,
  }).isRequired,
  preview: PropTypes.bool,
};

ScholarshipDetailCard.defaultProps = {
  id: undefined,
  preview: false,
};
