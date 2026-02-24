import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  Chip,
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
import ReportIcon from '@mui/icons-material/Report';
import SendIcon from '@mui/icons-material/Send';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';
import { ScholarshipAmountInfo } from '../../types/ScholarshipAmount';
import State from '../../types/States';
import { GradeLevelInfo } from '../../types/GradeLevel';
import { EthnicityInfo } from '../../types/Ethnicity';
import { lint } from '../../lib/lint';
import { genMailToLink, withDeviceInfo } from '../../lib/mail';
import ShareDialog from './ShareDialog';
import useAuth from '../../lib/useAuth';
import ScholarshipData from '../../types/ScholarshipData';
import { useTranslation } from 'react-i18next';
import { logEventAsync } from '../../lib/analytics';
import DetailCardCell from './scholarship-card/DetailCardCell';

export default function ScholarshipCard({
  scholarship,
  style = 'result',
}: {
  scholarship: {
    id?: string;
    data: ScholarshipData;
  };
  style?: 'result' | 'detail' | 'preview' | 'glance';
}): JSX.Element {
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
    lastModified,
  } = scholarship.data;
  const { ethnicities, gpa, grades, majors, schools, states } =
    requirements || {};
  const detailed = style !== 'result' && style !== 'glance';
  const preview = style === 'preview';
  const glance = style === 'glance';

  const [showShare, setShowShare] = useState(false);
  const { t } = useTranslation(['scholarships', 'common']);

  const navigate = useNavigate();

  const { claims, currentUser } = useAuth();
  const canEdit = currentUser?.uid === author?.id || (claims?.admin as boolean);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CardAreaComponent: any = detailed ? Box : CardActionArea;
  const lintIssues =
    canEdit && !preview && !glance ? lint(scholarship.data) : [];
  return (
    <Card variant="outlined" sx={{ minWidth: 240 }}>
      <CardAreaComponent
        onClick={
          detailed
            ? null
            : () => {
                logEventAsync('select_content', {
                  content_type: 'scholarship',
                  item_id: scholarship.id,
                  items: [{ scholarship }],
                });
                navigate('/scholarships/' + scholarship.id, {
                  state: { scholarship },
                });
              }
        }>
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
            <Grid>
              <Box sx={{ display: 'flex' }}>
                <AttachMoneyIcon color="primary" />
                <Typography>
                  {ScholarshipAmountInfo.toString(amount)}
                </Typography>
              </Box>
            </Grid>

            <Grid>
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
                variant="contained"
                color="primary"
                sx={{ mr: 1 }}
                onClick={() => {
                  logEventAsync('apply', {
                    id: scholarship.id,
                    website,
                  });
                  window.open(website, '_blank', 'noreferrer');
                }}
                startIcon={<SendIcon />}>
                {t('common:actions.apply')}
              </Button>
              <Button
                variant="outlined"
                startIcon={<ShareIcon />}
                onClick={() => setShowShare(true)}
                disabled={scholarship.id === undefined}>
                {t('common:actions.share')}
              </Button>

              {!preview && canEdit && (
                <IconButton component={Link} aria-label="edit" to="edit">
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
                {t('eligibilityReqs')}
              </Typography>
              <DetailCardCell
                label={t('states')}
                values={states?.map(State.toString).sort()}
                t={t}
              />
              <DetailCardCell
                label="GPA"
                values={
                  (gpa && [
                    Number.isInteger(gpa) ? gpa.toFixed(1) : gpa?.toString(),
                  ]) ||
                  undefined
                }
                t={t}
              />
              <DetailCardCell
                label={t('grades')}
                values={grades?.sort().map(GradeLevelInfo.toString)}
                t={t}
              />
              <DetailCardCell
                label={t('ethnicity')}
                values={ethnicities?.map(EthnicityInfo.toString).sort()}
                t={t}
              />
              <DetailCardCell
                label={t('majors')}
                values={majors?.sort()}
                t={t}
              />
              <DetailCardCell
                label={t('schools')}
                values={schools?.sort()}
                t={t}
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

          {detailed && !preview && (
            <Chip
              component={MuiLink}
              href={genMailToLink({
                subject: `Report Issue for ${name}`,
                bcc: author?.email,
                body: withDeviceInfo(
                  `Please describe the issue for the scholarship located at ${window.location.href}.`,
                ),
              })}
              icon={<ReportIcon />}
              sx={{ my: 5 }}
              label={t('common:actions.reportIssue')}
            />
          )}

          {!glance && (
            <Typography
              variant="subtitle2"
              align="right"
              color="text.secondary">
              {t('lastUpdated')}: {lastModified?.toLocaleDateString()}
            </Typography>
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
          scholarship={{ id: scholarship.id!, data: scholarship.data }}
        />
      )}
    </Card>
  );
}
