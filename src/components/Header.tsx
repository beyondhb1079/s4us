import React, { lazy, Suspense, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Alert,
  Avatar,
  Button,
  Grow,
  Hidden,
  IconButton,
  Link as MuiLink,
  Menu,
  Slide,
  MenuItem,
  Snackbar,
  Toolbar,
  useScrollTrigger,
  Box,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { TFunction, useTranslation } from 'react-i18next';
import { BRAND_NAME } from '../config/constants';
import HeaderNavMenu from './HeaderNavMenu';
import useAuth from '../lib/useAuth';
import PropTypes from 'prop-types';

const ProfileMenu = lazy(() => import('./ProfileDropdown'));

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();

  return (
    <>
      <Grow in={currentUser !== undefined}>
        {currentUser ? (
          <IconButton
            size="medium"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            color="inherit"
            sx={{ height: '100%', width: 64 }}>
            <Avatar src={currentUser.photoURL || undefined} />
          </IconButton>
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
      </Grow>
      <Suspense fallback={null}>
        <ProfileMenu anchorEl={anchorEl} onClose={() => setAnchorEl(null)} />
      </Suspense>
    </>
  );
};

const links = (t: TFunction<'common', undefined>) => ({
  [t('navbar.scholarships')]: '/scholarships',
  [t('navbar.add')]: '/scholarships/new',
});

const languages = {
  en: 'English',
  es: 'Español',
};

function Header(): JSX.Element {
  const { t, i18n } = useTranslation('common');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
          <Hidden smDown>
            <HeaderNavMenu links={links(t)} />
          </Hidden>
          <IconButton
            color="primary"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ px: 2 }}>
            <LanguageIcon />
          </IconButton>
          <AuthGrowButton t={t} />
        </Toolbar>
        <Hidden smUp>
          <Toolbar variant="dense">
            <HeaderNavMenu links={links(t)} />
          </Toolbar>
        </Hidden>
        <Menu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}>
          {Object.entries(languages).map(([abbr, lang]) => (
            <MenuItem
              key={lang}
              selected={abbr === i18n.language}
              onClick={() => {
                i18n.changeLanguage(abbr);
                setAnchorEl(null);
              }}>
              {lang}
            </MenuItem>
          ))}
        </Menu>
      </AppBar>
    </HideOnScroll>
  );
}

export function HeaderSkeleton(): JSX.Element {
  return (
    <Box sx={{ width: '100vw', visibility: 'hidden' }}>
      <Toolbar />
      <Hidden smUp>
        <Toolbar variant="dense" />
      </Hidden>
    </Box>
  );
}

export default Header;
