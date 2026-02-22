import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { BRAND_NAME } from '../config/constants';
import HeaderNavMenu from './HeaderNavMenu';
import useAuth from '../lib/useAuth';
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

const OnRenderSnackbar = () => {
  const [prNum, setPrNum] = useState<string | null>(null);
  const [open, setOpen] = useState(true);

  // Run the regex exactly once when the component mounts
  useEffect(() => {
    const match = window.location.hostname.match(
      /s4us-pr-(\d+)\.onrender\.com/,
    );
    if (match) {
      setPrNum(match[1]);
    }
  }, []);

  if (!prNum) return null;

  const link = `https://github.com/beyondhb1079/s4us/pull/${prNum}`;
  return (
    <Snackbar open={open}>
      <Alert onClose={() => setOpen(false)} severity="info">
        This is a preview of{' '}
        <MuiLink href={link}>Pull Request #{prNum}</MuiLink>
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

function Header(): JSX.Element {
  const { t } = useTranslation('common');

  const navLinks = useMemo(
    () => ({
      [t('scholarships')]: '/scholarships',
      [t('actions.add')]: '/scholarships/new',
    }),
    [t],
  );

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
            <HeaderNavMenu links={navLinks} />
          </Box>
          <TranslationMenu />
          <AuthGrowButton t={t} />
        </Toolbar>
        <Toolbar variant="dense" sx={{ display: { sm: 'none', xs: 'block' } }}>
          <HeaderNavMenu links={navLinks} />
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
