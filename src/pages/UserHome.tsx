import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { AddCircle as AddIcon, Inbox as InboxIcon } from '@mui/icons-material';
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
} from '@mui/material';
import ScholarshipList from '../components/ScholarshipList';
import { useTranslation } from 'react-i18next';
import LookingForScholarshipsBanner from '../components/LookingForScholarshipsBanner';
import useAuth from '../lib/useAuth';

type LocationProps = {
  state: { alert?: { message?: string } };
};

export default function UserHome(): JSX.Element {
  const { t } = useTranslation(['userHome', 'common']);
  const { currentUser: user } = useAuth();
  const location = useLocation() as LocationProps;

  const navType = useNavigationType();
  const alertMessage = location?.state?.alert?.message;
  const [showAlert, setShowAlert] = useState(true);
  return (
    <Container sx={{ p: 2 }}>
      <Helmet>
        <title>{t('common:dashboard')}</title>
      </Helmet>

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
      <ScholarshipList
        extraFilters={{ authorId: user?.uid, hideExpired: false }}
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
    </Container>
  );
}
