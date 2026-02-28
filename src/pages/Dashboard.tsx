import React, { Suspense, useState } from 'react';
import useDocumentTitle from '../lib/useDocumentTitle';
import AddIcon from '@mui/icons-material/AddCircle';
import InboxIcon from '@mui/icons-material/Inbox';
import { Link, useLocation, useNavigationType } from 'react-router-dom';
import {
  Button,
  Container,
  Grid,
  Link as MuiLink,
  Paper,
  Typography,
  Alert,
  Collapse,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import ScholarshipList from '../components/scholarship/ScholarshipList';
import PendingApprovalsQueue from '../components/admin/PendingApprovalsQueue';
import { useTranslation } from 'react-i18next';
import LookingForScholarshipsBanner from '../components/home/LookingForScholarshipsBanner';
import useAuth from '../lib/useAuth';

type LocationProps = {
  state: { alert?: { message?: string } };
};

export default function Dashboard(): JSX.Element {
  const { t } = useTranslation(['dashboard', 'common']);
  useDocumentTitle(t('common:dashboard'));
  const { currentUser: user, claims } = useAuth();
  const location = useLocation() as LocationProps;

  const navType = useNavigationType();
  const alertMessage = location?.state?.alert?.message;
  const [showAlert, setShowAlert] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);
  const isAdmin = !!user && !!claims?.admin;

  return (
    <Container sx={{ p: 2 }}>
      {alertMessage && navType === 'PUSH' && (
        <Collapse in={showAlert}>
          <Alert severity="success" onClose={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        </Collapse>
      )}

      <Typography variant="h4" component="h1" gutterBottom>
        {t('common:welcome')} {user?.displayName}
      </Typography>

      <LookingForScholarshipsBanner />

      {isAdmin && (
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2, mt: 3 }}>
          <Tabs
            value={tabIndex}
            onChange={(_, v) => setTabIndex(v)}
            aria-label="dashboard tabs">
            <Tab
              label={t('addedScholarships')}
              id="dash-tab-0"
              aria-controls="dash-tabpanel-0"
            />
            <Tab
              label="Pending AI Approvals"
              id="dash-tab-1"
              aria-controls="dash-tabpanel-1"
            />
          </Tabs>
        </Box>
      )}

      <Box
        role="tabpanel"
        hidden={isAdmin && tabIndex !== 0}
        id="dash-tabpanel-0"
        aria-labelledby="dash-tab-0">
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          sx={{ marginY: { xs: 1, md: 2 } }}>
          <Grid item>
            <Typography variant="h5" component="h2">
              {t('addedScholarships')}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              component={Link}
              to="/scholarships/new">
              {t('common:actions.addScholarship')}
            </Button>
          </Grid>
        </Grid>
        <Suspense fallback={null}>
          <ScholarshipList
            extraFilters={{ authorId: user?.uid, showExpired: true }}
            noResultsNode={
              <Grid
                container
                component={Paper}
                variant="outlined"
                alignItems="center"
                justifyContent="space-around"
                sx={{ padding: 3, marginY: 1 }}>
                <Grid item>
                  <InboxIcon sx={{ fontSize: (theme) => theme.spacing(25) }} />
                </Grid>
                <Grid item>
                  <Typography variant="h5" gutterBottom>
                    {t('noneAdded')}
                  </Typography>
                  <MuiLink component={Link} to="/scholarships/new">
                    {t('common:actions.addScholarship')}
                  </MuiLink>
                </Grid>
              </Grid>
            }
          />
        </Suspense>
      </Box>

      {isAdmin && (
        <Box
          role="tabpanel"
          hidden={tabIndex !== 1}
          id="dash-tabpanel-1"
          aria-labelledby="dash-tab-1">
          <Paper elevation={2} sx={{ p: 2 }}>
            <PendingApprovalsQueue />
          </Paper>
        </Box>
      )}
    </Container>
  );
}
