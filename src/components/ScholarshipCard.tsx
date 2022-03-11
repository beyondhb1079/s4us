import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
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
import State from '../types/States';
import { lint } from '../lib/lint';
import ShareDialog from './ShareDialog';
import useAuth from '../lib/useAuth';
import ScholarshipData from '../types/ScholarshipData';

const DetailCardCell = ({ label, text }: { label: string; text: string }) => (
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

export default function ScholarshipCard({
  scholarship,
  style = 'result',
}: {
  scholarship: {
    id: string;
    data: ScholarshipData;
  };
  style: 'result' | 'detail' | 'preview';
}): ReactNode {
  const {
    name,
    organization,
    amount,
    deadline,
    website,
    description,
    tags,
    requirements: reqs,
    author,
  } = scholarship.data;
  const detailed = style !== 'result';
  const preview = style === 'preview';

  const [showShare, setShowShare] = useState(false);

  const { claims, currentUser } = useAuth();
  const canEdit = currentUser?.uid === author?.id || claims?.admin;

  const CardAreaComponent: React.FC<{
    [key: string]: any;
  }> = detailed ? Box : CardActionArea;
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
              display: !detailed ? '-webkit-box' : undefined,
              WebkitLineClamp: !detailed ? 5 : undefined,
              lineClamp: !detailed ? 5 : undefined,
              WebkitBoxOrient: !detailed ? 'vertical' : undefined,
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
                text={
                  reqs?.states?.map(State.toString).sort().join(', ') || 'All'
                }
              />
              <DetailCardCell
                label="GPA"
                text={
                  reqs?.gpa && Number.isInteger(reqs?.gpa)
                    ? reqs.gpa.toFixed(1)
                    : reqs?.gpa?.toString() || 'All'
                }
              />
              <DetailCardCell
                label="Grades"
                text={
                  reqs?.grades?.map(GradeLevel.toString).sort().join(', ') ||
                  'All'
                }
              />
              <DetailCardCell
                label="Demographic"
                text={
                  reqs?.ethnicities
                    ?.map(Ethnicity.toString)
                    .sort()
                    .join(', ') || 'All'
                }
              />
              <DetailCardCell
                label="Majors"
                text={reqs?.majors?.sort().join(', ') || 'All'}
              />
              <DetailCardCell
                label="Schools"
                text={reqs?.schools?.sort().join(', ') || 'All'}
              />
            </Box>
          )}

          {tags && (
            <Stack direction="row" sx={{ mt: 2 }}>
              {tags.map((tag, i) => (
                <Chip
                  id={i.toString()}
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
