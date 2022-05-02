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

export default function UserHome() {
  const { t } = useTranslation('userHome');
  const { currentUser: user } = useAuth();
  const location = useLocation();

  const navType = useNavigationType();
  const alertMessage = location?.state?.alert?.message;
  const [showAlert, setShowAlert] = useState(true);
  return (
    <Container sx={{ p: 2 }}>
      <Helmet>
        <title>{t('titleTag')}</title>
      </Helmet>

      {alertMessage && navType === 'PUSH' && (
        <Collapse in={showAlert}>
          <Alert severity="success" onClose={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        </Collapse>
      )}

      <Typography variant="h4" component="h1" gutterBottom>
        {t('welcome')} {user.displayName}
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
            {t('btn.addScholarship')}
          </Button>
        </Grid>
      </Grid>
      <ScholarshipList
        extraFilters={{ authorId: user.uid, hideExpired: false }}
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
              <Typography variant="h5" gutterButtom>
                {t('noneAdded')}
              </Typography>
              <MuiLink component={Link} to="/scholarships/new">
                {t('btn.addScholarship')}
              </MuiLink>
            </Grid>
          </Grid>
        }
      />
    </Container>
  );
}
