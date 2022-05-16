import React, { lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Button,
  Grow,
  Link as MuiLink,
  Slide,
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

// Lazy load components that only conditionally appear.
const OnRenderSnackbar = lazy(() => import('./OnRenderSnackbar'));
const ProfileMenu = lazy(() => import('./ProfileMenu'));
const LoginDialog = lazy(() => import('./LoginDialog'));

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
          <Suspense fallback={null}>
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
            <LoginDialog />
          </Suspense>
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
          <Suspense fallback={null}>
            {window.location.host.endsWith('onrender.com') && (
              <OnRenderSnackbar />
            )}
          </Suspense>
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
        <Toolbar sx={{ display: { sm: 'none', xs: 'block' } }} variant="dense">
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

      <Box sx={{ display: { sm: 'none', xs: 'block' } }}>
        <Toolbar variant="dense" />
      </Box>
    </Box>
  );
}

export default Header;
