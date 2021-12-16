import React from 'react';
import Helmet from 'react-helmet';
import { AddCircle as AddIcon, Inbox as InboxIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import {
  Button,
  Container,
  Grid,
  Link as MuiLink,
  Paper,
  Typography,
} from '@mui/material';
import Scholarships from '../models/Scholarships';
import ScholarshipList from '../components/ScholarshipList';
import img5 from '../img/img5.svg';
import { useTranslation } from 'react-i18next';

export default function UserHome() {
  const { t } = useTranslation();
  const user = firebase.auth().currentUser;

  const listScholarshipsFn = () => Scholarships.list({ authorId: user.uid });

  return (
    <Container>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Typography variant="h4" gutterBottom>
        {t('home.user.welcome')} {user.displayName}
      </Typography>
      <Grid
        container
        component={Paper}
        variant="outlined"
        sx={{ padding: { xs: 2, md: 3 } }}>
        <Grid item sm={6} xs={12}>
          <Typography variant="h5" gutterBottom>
            {t('home.user.looking')}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/scholarships"
            sx={{ marginY: { xs: 1, md: 2 } }}>
            {t('btn.browse')}
          </Button>
        </Grid>
        <Grid item sm={6} xs={12}>
          <img src={img5} style={{ maxHeight: '192px' }} />
        </Grid>
      </Grid>
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
                {t('home.user.noAdded')}
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
