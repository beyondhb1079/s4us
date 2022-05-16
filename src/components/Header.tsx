import React, { lazy, Suspense, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Alert,
  Button,
  Grow,
  Link as MuiLink,
  Slide,
  Snackbar,
  Toolbar,
  useScrollTrigger,
  Box,
} from '@mui/material';
import { TFunction, useTranslation } from 'react-i18next';
import { BRAND_NAME } from '../config/constants';
import HeaderNavMenu from './HeaderNavMenu';
import useAuth from '../lib/useAuth';
import PropTypes from 'prop-types';
import TranslationMenu from './TranslationMenu';

const ProfileMenu = lazy(() => import('./ProfileMenu'));

function HideOnScroll({ children }: { children: JSX.Element }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const OnRenderSnackbar = () => {
  const match = window.location.hostname.match(/s4us-pr-(\d+)\.onrender\.com/);
  const [open, setOpen] = useState(true);
  if (!match) return null;

  const num = match[1];
  const link = `https://github.com/beyondhb1079/s4us/pull/${num}`;
  return (
    <Snackbar open={open}>
      <Alert onClose={() => setOpen(false)} severity="info">
        This is a preview of <MuiLink href={link}>Pull Request #{num}</MuiLink>
      </Alert>
    </Snackbar>
  );
};

const AuthGrowButton = ({ t }: { t: TFunction<'common', undefined> }) => {
  const { currentUser } = useAuth();
  const location = useLocation();

  return (
    <Grow in={currentUser !== undefined}>
      <Box width={64}>
        {currentUser ? (
          <Suspense fallback={null}>
            <ProfileMenu />
          </Suspense>
        ) : (
          <Button
            color="primary"
            variant="contained"
            component={Link}
            replace
            to={location.pathname}
            state={{ showLoginDialog: true }}
            sx={{ height: '100%', width: 64 }}>
            {t('actions.login')}
          </Button>
        )}
      </Box>
    </Grow>
  );
};

const links = (t: TFunction<'common', undefined>) => ({
  [t('navbar.scholarships')]: '/scholarships',
  [t('navbar.add')]: '/scholarships/new',
});

function Header(): JSX.Element {
  const { t } = useTranslation('common');

  return (
    <HideOnScroll>
      <AppBar
        color="secondary"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <OnRenderSnackbar />
          <MuiLink
            component={Link}
            to="/"
            variant="h5"
            color="primary"
            underline="none"
            sx={{ flexGrow: 1 /** Take up remaining space */ }}>
            {BRAND_NAME.toUpperCase()}
          </MuiLink>
          <Box sx={{ display: { sm: 'block', xs: 'none' } }}>
            <HeaderNavMenu links={links(t)} />
          </Box>
          <TranslationMenu />
          <AuthGrowButton t={t} />
        </Toolbar>
        <Toolbar variant="dense" sx={{ display: { sm: 'none', xs: 'block' } }}>
          <HeaderNavMenu links={links(t)} />
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

export function HeaderSkeleton(): JSX.Element {
  return (
    <Box sx={{ width: '100vw', visibility: 'hidden' }}>
      <Toolbar />
      <Toolbar variant="dense" sx={{ display: { sm: 'none', xs: 'block' } }} />
    </Box>
  );
}

export default Header;
