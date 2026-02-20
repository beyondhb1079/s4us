import React, { ReactNode } from 'react';
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
import { TFunction } from 'i18next';

const FooterLink = ({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}): JSX.Element => {
  const internal = to.includes(':');
  return (
    <MuiLink
      component={internal ? Link : MuiLink}
      to={internal ? to : undefined}
      href={internal ? undefined : to}
      variant="subtitle2"
      color="text.secondary"
      underline="hover">
      {children}
    </MuiLink>
  );
};

const quickLinks = (t: TFunction<'common', undefined>) => ({
  [t('actions.addScholarship')]: '/scholarships/new',
  [t('actions.browseScholarships')]: '/scholarships',
});

const orgLinks = (t: TFunction<'common', undefined>) => ({
  [t('footer.about')]: '/about',
  [t('footer.contact')]: '/contact',
});

const helpLinks = (t: TFunction<'common', undefined>) => ({
  [t('actions.reportIssue')]: genMailToLink({
    subject: 'Bug Report',
    body: withDeviceInfo(reportIssue),
  }),
  [t('footer.suggestIdea')]: genMailToLink({
    subject: 'Feature Request',
    body: withDeviceInfo(featureRequest),
  }),
  [t('footer.subscribeForUpdates')]: SUBSCRIPTION_FORM_URL,
  [t('footer.reachOut')]: genMailToLink({
    subject: 'Outreach',
    body: 'Please describe the purpose of your outreach below.\n',
  }),
});

function Footer(): JSX.Element {
  const { t } = useTranslation('common');

  const columns = {
    [t('footer.quickLinks')]: quickLinks(t),
    [t('footer.organization')]: orgLinks(t),
    [t('footer.help')]: helpLinks(t),
  };

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
              <FooterLink to="/privacy">{t('footer.privacy')}</FooterLink> -{' '}
              <FooterLink to="/terms">{t('footer.terms')}</FooterLink>
            </Typography>
          </Grid>
          {Object.entries(columns).map(([title, links]) => (
            <Grid item sx={{ width: 170 }} key={title}>
              <Typography
                color={(theme) => theme.palette.grey[500]}
                sx={{ fontWeight: 'bold' }}>
                {title}
              </Typography>
              {Object.entries(links).map(([name, to]) => (
                <Box key={name}>
                  <FooterLink to={to}>{name}</FooterLink>
                </Box>
              ))}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
export default Footer;
