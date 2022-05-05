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
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const quickLinks = {
  'footer.addScholarship': '/scholarships/new',
  'footer.browseScholarship': '/scholarships',
};

const orgLinks = {
  'footer.about': '/about',
  'footer.contact': '/contact',
};

const helpLinks = {
  'footer.reportIssue': genMailToLink({
    subject: 'Bug Report',
    body: withDeviceInfo(reportIssue),
  }),
  'footer.suggestIdea': genMailToLink({
    subject: 'Feature Request',
    body: withDeviceInfo(featureRequest),
  }),
  'footer.subscribeForUpdates': SUBSCRIPTION_FORM_URL,
  'footer.reachOut': genMailToLink({
    subject: 'Outreach',
    body: 'Please describe the purpose of your outreach below.\n',
  }),
};

function FooterColumn({ title, links, internal, t }) {
  return (
    <Grid item sx={{ width: 170 }}>
      <Typography
        color={(theme) => theme.palette.grey[500]}
        sx={{ fontWeight: 'bold' }}>
        {t(title)}
      </Typography>
      {Object.entries(links).map(([name, link]) => (
        <Box key={name}>
          <MuiLink
            component={internal ? Link : MuiLink}
            to={internal ? link : ''}
            href={!internal ? link : ''}
            variant="subtitle2"
            color="text.secondary"
            underline="hover">
            {t(name)}
          </MuiLink>
        </Box>
      ))}
    </Grid>
  );
}

FooterColumn.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.objectOf(PropTypes.string).isRequired,
  internal: PropTypes.bool,
  t: PropTypes.func,
};
FooterColumn.defaultProps = {
  internal: false,
};

function Footer() {
  const { t } = useTranslation('common');

  return (
    <Box sx={{ bgcolor: 'background.secondary', zIndex: 1200 }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid item sx={{ width: 170 }}>
            <MuiLink
              component={Link}
              to="/"
              underline="none"
              color="text.secondary">
              DREAMSCHOLARS
            </MuiLink>
            <Typography color="text.secondary">&copy; 2022</Typography>
            <Typography color="text.secondary">
              <MuiLink
                component={Link}
                to="/privacy"
                variant="subtitle2"
                color="text.secondary"
                underline="hover">
                {t('footer.privacy')}
              </MuiLink>{' '}
              -{' '}
              <MuiLink
                component={Link}
                to="/terms"
                variant="subtitle2"
                color="text.secondary"
                underline="hover">
                {t('footer.terms')}
              </MuiLink>
            </Typography>
          </Grid>

          <FooterColumn
            title="footer.quickLinks"
            links={quickLinks}
            t={t}
            internal
          />

          <FooterColumn
            title="footer.organization"
            links={orgLinks}
            t={t}
            internal
          />

          <FooterColumn title="footer.help" links={helpLinks} t={t} />
        </Grid>
      </Container>
    </Box>
  );
}
export default Footer;
