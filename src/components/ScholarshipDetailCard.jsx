import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Link as MuiLink,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Report as ReportIcon,
  Send as SendIcon,
  Share as ShareIcon,
  Edit as EditIcon,
  AttachMoney as AttachMoneyIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import { genMailToLink, withDeviceInfo } from '../lib/mail';
import ScholarshipAmount from '../types/ScholarshipAmount';
import { BRAND_NAME } from '../config/constants';
import Ethnicity from '../types/Ethnicity';
import GradeLevel from '../types/GradeLevel';

const DetailCardCell = ({ label, text }) => (
  <>
    <Grid container justifyContent="space-between">
      <Grid item xs={12} sm>
        <Typography>{label}</Typography>
      </Grid>
      <Grid item sx={{ textAlign: { sm: 'right' } }} xs={12} sm>
        <Typography>{text}</Typography>
      </Grid>
    </Grid>
    <Divider light sx={{ m: 1.5 }} />
  </>
);

DetailCardCell.propTypes = {
  label: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default function ScholarshipDetailCard({ scholarship, preview }) {
  const history = useHistory();
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
      title: `${ScholarshipAmount.toString(amount)} - ${name} | ${BRAND_NAME}`,
      text: `${ScholarshipAmount.toString(amount)}
       - ${name} | ${BRAND_NAME} \n ${deadline?.toLocaleDateString()}\n`,
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

  const [canEdit, setCanEdit] = useState(
    firebase.auth().currentUser?.uid === author?.id
  );
  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (!preview && currentUser && currentUser.uid !== author?.id) {
      currentUser
        .getIdTokenResult()
        .then((idTokenResult) => {
          if (idTokenResult.claims.admin) {
            setCanEdit(true);
          }
        })
        // eslint-disable-next-line no-console
        .catch(console.error);
    }
  }, [author, preview]);

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {organization}
      </Typography>
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      {preview && (
        <MuiLink
          href="#"
          underline="always"
          onClick={(e) => e.preventDefault()}
          sx={{ display: 'block', mb: 2 }}>
          {website}
        </MuiLink>
      )}

      <Grid container spacing={3}>
        <Grid item>
          <Box sx={{ display: 'flex' }}>
            <AttachMoneyIcon color="primary" />
            <Typography>{ScholarshipAmount.toString(amount)}</Typography>
          </Box>
        </Grid>

        <Grid item>
          <Box sx={{ display: 'flex' }}>
            <EventIcon color="primary" sx={{ mr: 0.5 }} />
            <Typography>
              {deadline?.toLocaleDateString() || 'Unknown'}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ my: 2, py: 1 }}>
        <Button
          component={MuiLink}
          href={website}
          target="_blank"
          rel="noreferrer"
          variant="contained"
          color="primary"
          sx={{ mr: 1 }}
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

        {!preview && canEdit && (
          <IconButton
            component={Link}
            to={{
              pathname: `/scholarships/${scholarship.id}/edit`,
            }}>
            <EditIcon />
          </IconButton>
        )}
      </Box>

      <Typography paragraph sx={{ whiteSpace: 'pre-line' }}>
        {description}
      </Typography>
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" component="h4" paragraph>
          Eligibility Requirements
        </Typography>
        <DetailCardCell
          label="State"
          text={requirements?.states?.join(', ') || 'All'}
        />
        <DetailCardCell
          label="GPA"
          text={requirements?.gpa?.toFixed(1) || 'All'}
        />
        <DetailCardCell
          label="Grades"
          text={
            requirements?.grades?.map(GradeLevel.toString).join(', ') || 'All'
          }
        />
        <DetailCardCell
          label="Demographic"
          text={
            requirements?.ethnicities?.map(Ethnicity.toString).join(', ') ||
            'All'
          }
        />
        <DetailCardCell
          label="Majors"
          text={requirements?.majors?.join(', ') || 'All'}
        />
        <DetailCardCell
          label="Schools"
          text={requirements?.schools?.join(', ') || 'All'}
        />
      </Box>

      <Grid container sx={{ mt: 6 }}>
        {!tags || !tags.length
          ? 'None'
          : tags.map((tag) => (
              <Chip
                label={tag}
                variant="outlined"
                color="primary"
                sx={{ mr: 2, color: (theme) => theme.palette.text.primary }}
                key={tag}
              />
            ))}
      </Grid>

      <Chip
        component={MuiLink}
        href={genMailToLink({
          subject: `Report Issue for ${name}`,
          bcc: author?.email,
          body: withDeviceInfo(
            `Please describe the issue for the scholarship located at ${URL}.`
          ),
        })}
        icon={<ReportIcon />}
        sx={{ my: 5 }}
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
      amount: PropTypes.shape({}),
      description: PropTypes.string,
      deadline: PropTypes.instanceOf(Date),
      website: PropTypes.string,
      tags: PropTypes.arrayOf(PropTypes.string),
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
  preview: false,
};
