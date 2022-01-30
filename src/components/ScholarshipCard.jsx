import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  CardActionArea,
  CardContent,
  Alert,
  AlertTitle,
  Stack,
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
import Ethnicity from '../types/Ethnicity';
import GradeLevel from '../types/GradeLevel';
import { lint } from '../lib/lint';
import ShareDialog from './ShareDialog';

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

export default function ScholarshipCard({ scholarship, style }) {
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
  const detailed = style !== 'result';
  const preview = style === 'preview';

  const [showShare, setShowShare] = useState(false);

  const currentUser = firebase.auth().currentUser;
  const [canEdit, setCanEdit] = useState(
    currentUser ? currentUser.uid === author?.id : false
  );
  useEffect(() => {
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
  }, [author, currentUser, preview]);

  const CardAreaComponent = detailed ? Box : CardActionArea;
  const lintIssues = canEdit || preview ? lint(scholarship.data) : [];
  return (
    <Card variant="outlined">
      <CardAreaComponent
        component={detailed ? Box : Link}
        to={'/scholarships/' + scholarship.id}
        state={{ scholarship }}>
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant={detailed ? 'h6' : 'subtitle1'}
            sx={{
              fontWeight: 'medium',
            }}>
            {organization}
          </Typography>
          <Typography variant={detailed ? 'h4' : 'h5'} gutterBottom>
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

          {detailed && (
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
                onClick={() => setShowShare(true)}
                disabled={scholarship.id === undefined}>
                Share
              </Button>

              {!preview && canEdit && (
                <IconButton component={Link} to="edit">
                  <EditIcon />
                </IconButton>
              )}
            </Box>
          )}

          <Typography
            paragraph
            sx={{
              display: detailed ? '-webkit-box' : undefined,
              WebkitLineClamp: detailed ? 5 : undefined,
              lineClamp: detailed ? 5 : undefined,
              WebkitBoxOrient: detailed ? 'vertical' : undefined,
              overflow: 'hidden',
              whiteSpace: 'pre-line',
              my: 2,
            }}>
            {description}
          </Typography>
          {detailed && (
            <Box sx={{ my: 4 }}>
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
                  requirements?.grades?.map(GradeLevel.toString).join(', ') ||
                  'All'
                }
              />
              <DetailCardCell
                label="Demographic"
                text={
                  requirements?.ethnicities
                    ?.map(Ethnicity.toString)
                    .join(', ') || 'All'
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
          )}

          {tags && (
            <Stack direction="row" sx={{ mt: 2 }}>
              {tags.map((tag, i) => (
                <Chip
                  id={i}
                  label={tag}
                  variant="outlined"
                  color="primary"
                  sx={{ mr: 2, color: 'text.primary' }}
                  key={tag}
                />
              ))}
            </Stack>
          )}

          {detailed && (
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
          )}
        </CardContent>
      </CardAreaComponent>
      {lintIssues.length > 0 && (
        <Alert severity="warning">
          <AlertTitle>
            <strong>{lintIssues.length} potential issues detected</strong>
          </AlertTitle>
          <Box component="ul">
            {lintIssues.map((m, i) => (
              <Typography key={i} component="li">
                {m}
              </Typography>
            ))}
          </Box>
        </Alert>
      )}
      {detailed && (
        <ShareDialog
          open={showShare}
          onClose={() => setShowShare(false)}
          scholarship={scholarship}
        />
      )}
    </Card>
  );
}

ScholarshipCard.propTypes = {
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
        ethnicities: PropTypes.arrayOf(PropTypes.string),
        gpa: PropTypes.number,
        grades: PropTypes.arrayOf(PropTypes.number),
        majors: PropTypes.arrayOf(PropTypes.string),
        schools: PropTypes.arrayOf(PropTypes.string),
        states: PropTypes.arrayOf(PropTypes.string),
      }),
    }).isRequired,
  }).isRequired,
  style: PropTypes.oneOf(['result', 'detail', 'preview']),
};

ScholarshipCard.defaultProps = {
  style: 'result',
};
