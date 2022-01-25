import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import {
  AppBar,
  Alert,
  AlertTitle,
  Avatar,
  Button,
  Grow,
  Hidden,
  IconButton,
  Link as MuiLink,
  Menu,
  MenuItem,
  Snackbar,
  Toolbar,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import ProfileMenu from './ProfileDropdown';
import { useTranslation } from 'react-i18next';
import { BRAND_NAME, SUBSCRIPTION_FORM_URL } from '../config/constants';
import HeaderNavMenu from './HeaderNavMenu';

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

const UnderConstructionAlert = ({ t }) => (
  <Alert
    severity="warning"
    action={
      <Button component={MuiLink} href={SUBSCRIPTION_FORM_URL}>
        {t('btn.subscribeForUpdates')}
      </Button>
    }>
    <AlertTitle>{t('alert.warning')}</AlertTitle>
    {t('constructAlert.description')}
  </Alert>
);

const AuthGrowButton = ({ t }) => {
  const { currentUser } = firebase.auth();
  const [isSignedIn, setIsSignedIn] = useState(
    !!firebase.auth().currentUser || undefined
  );

  useEffect(
    () => firebase.auth().onAuthStateChanged((user) => setIsSignedIn(!!user)),
    []
  );
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <>
      <Grow in={isSignedIn !== undefined}>
        {isSignedIn ? (
          <IconButton
            size="medium"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            color="inherit"
            sx={{ height: '100%', width: 64 }}>
            <Avatar src={currentUser.photoURL} />
          </IconButton>
        ) : (
          <Button
            color="primary"
            variant="contained"
            component={Link}
            replace
            to=""
            state={{ showLoginDialog: true }}
            sx={{ height: '100%', width: 64 }}>
            {t('btn.login')}
          </Button>
        )}
      </Grow>
      <ProfileMenu anchorEl={anchorEl} onClose={() => setAnchorEl(null)} />
    </>
  );
};

const links = {
  'navbar.scholarships': '/scholarships',
  'navbar.add': '/scholarships/new',
  'navbar.about': '/about',
  'navbar.contact': '/contact',
};

const languages = {
  en: 'English',
  es: 'Español',
};

function Header() {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <AppBar position="static" color="secondary" variant="outlined">
      <UnderConstructionAlert t={t} />
      <OnRenderSnackbar />
      <Toolbar>
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
          <HeaderNavMenu links={links} />
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
          <HeaderNavMenu links={links} />
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
  );
}

export default Header;
