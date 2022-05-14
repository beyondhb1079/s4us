import React, { lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  IconButton,
  Link as MuiLink,
  Slide,
  Toolbar,
  useScrollTrigger,
  Box,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { TFunction, useTranslation } from 'react-i18next';
import { BRAND_NAME } from '../config/constants';
import HeaderNavMenu from './HeaderNavMenu';
import PropTypes from 'prop-types';

// Lazy load since immediate render not essential
const AuthButton = lazy(() => import('./AuthButton'));
const OnRenderSnackbar = lazy(() => import('./OnRenderSnackbar'));
const TranslationMenu = lazy(() => import('./TranslationMenu'));

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

const links = (t: TFunction<'common', undefined>) => ({
  [t('navbar.scholarships')]: '/scholarships',
  [t('navbar.add')]: '/scholarships/new',
});

function Header(): JSX.Element {
  const { t } = useTranslation('common');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
          <IconButton
            aria-label="select language"
            color="primary"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ px: 2 }}>
            <LanguageIcon />
          </IconButton>
          <Suspense fallback={<Box width={64} />}>
            <AuthButton />
          </Suspense>
        </Toolbar>
        <Toolbar sx={{ display: { sm: 'none', xs: 'block' } }} variant="dense">
          <HeaderNavMenu links={links(t)} />
        </Toolbar>
        <Suspense fallback={null}>
          <TranslationMenu anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
        </Suspense>
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
