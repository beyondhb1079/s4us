import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link as MuiLink,
} from '@mui/material';
import {
  genMailToLink,
  reportIssue,
  featureRequest,
  withDeviceInfo,
} from '../lib/mail';
import { SUBSCRIPTION_FORM_URL } from '../config/constants';

const quickLinks = {
  'Add a scholarship': '/scholarships/new',
  'Browse scholarship': '/scholarships',
};

const companyLinks = {
  About: '/about',
  Contact: '/contact',
};

const helpLinks = {
  'Report an issue': genMailToLink({
    subject: 'Bug Report',
    body: withDeviceInfo(reportIssue),
  }),
  'Suggest an idea': genMailToLink({
    subject: 'Feature Request',
    body: withDeviceInfo(featureRequest),
  }),
  'Subscribe for updates': SUBSCRIPTION_FORM_URL,

  'Reach out': genMailToLink({
    subject: 'Outreach',
    body: 'Please describe the purpose of your outreach below.\n',
  }),
};

function FooterColumn({ title, links, internal }) {
  return (
    <Grid item>
      <Typography
        color={(theme) => theme.palette.grey[500]}
        sx={{ fontWeight: 'bold' }}>
        {title}
      </Typography>
      {Object.entries(links).map(([name, link]) => (
        <Box key={name}>
          <MuiLink
            component={internal && Link}
            to={internal ? link : ''}
            href={!internal ? link : ''}
            variant="subtitle2"
            color="text.secondary"
            underline="hover">
            {name}
          </MuiLink>
        </Box>
      ))}
    </Grid>
  );
}

function Footer() {
  return (
    <Box sx={{ bgcolor: 'background.secondary' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid item xs={12} sm={6}>
            <MuiLink
              component={Link}
              to="/"
              underline="none"
              color="text.secondary">
              DREAMSCHOLARS
            </MuiLink>
            <Typography color="text.secondary">&copy; 2022</Typography>
            <Typography color="text.secondary">Privacy - Terms</Typography>
          </Grid>

          <FooterColumn title="Quick Links" links={quickLinks} internal />

          <FooterColumn title="Company" links={companyLinks} internal />

          <FooterColumn title="Help" links={helpLinks} />
        </Grid>
      </Container>
    </Box>
  );
}
export default Footer;
