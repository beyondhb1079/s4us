import React from 'react';
import Helmet from 'react-helmet';
import { AddCircle as AddIcon, Inbox as InboxIcon } from '@mui/icons-material';
import { Link, useLocation, useHistory } from 'react-router-dom';
import firebase from 'firebase';
import {
  Button,
  Container,
  Grid,
  Link as MuiLink,
  Paper,
  Typography,
  Alert,
} from '@mui/material';
import Scholarships from '../models/Scholarships';
import ScholarshipList from '../components/ScholarshipList';
import { useTranslation } from 'react-i18next';
import LookingForScholarshipsBanner from '../components/LookingForScholarshipsBanner';

export default function UserHome() {
  const { t } = useTranslation();
  const user = firebase.auth().currentUser;
  const location = useLocation();
  const history = useHistory();

  const listScholarshipsFn = () => Scholarships.list({ authorId: user.uid });

  return (
    <Container>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      {location?.state?.alert && (
        <Alert severity="success" onClose={() => history.replace('/')}>
          {location?.state?.alert.message}
        </Alert>
      )}

      <Typography variant="h4" gutterBottom>
        {t('home.user.welcome')} {user.displayName}
      </Typography>

      <LookingForScholarshipsBanner />

      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        sx={{ marginY: { xs: 1, md: 2 } }}>
        <Grid item>
          <Typography variant="h5" component="h2">
            {t('home.user.added')}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            to="/scholarships/new">
            {t('btn.add')}
          </Button>
        </Grid>
      </Grid>
      <ScholarshipList
        listFn={listScholarshipsFn}
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
                {t('home.user.noneAdded')}
              </Typography>
              <MuiLink component={Link} to="/scholarships/new">
                {t('btn.add')}
              </MuiLink>
            </Grid>
          </Grid>
        }
      />
    </Container>
  );
}
