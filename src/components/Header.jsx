import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import {
  Alert,
  AlertTitle,
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  Link as MuiLink,
  Snackbar,
  Zoom,
  Menu,
  MenuItem,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ProfileMenu from './ProfileDropdown';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';

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

const AuthZoomButton = ({ t }) => {
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
      <Zoom in={isSignedIn !== undefined}>
        {isSignedIn ? (
          <IconButton
            size="medium"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            color="inherit">
            <Avatar src={currentUser.photoURL} />
          </IconButton>
        ) : (
          <Button
            color="inherit"
            component={Link}
            to={{ state: { showLoginDialog: true } }}>
            {t('btn.login')}
          </Button>
        )}
      </Zoom>
      {isSignedIn && (
        <ProfileMenu
          anchorEl={anchorEl}
          handleClose={() => setAnchorEl(null)}
        />
      )}
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  header: {
    flexGrow: 1,
    padding: `${theme.spacing(3)} 0`,
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'space-around',
    },
  },
  authItem: {
    minWidth: '100px',
  },
}));

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
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <Container>
      <UnderConstructionAlert t={t} />
      <OnRenderSnackbar />
      <Grid container className={classes.header} spacing={3}>
        <Grid item>
          <MuiLink component={Link} to="/" variant="h4" underline="none">
            {BRAND_NAME.toUpperCase()}
          </MuiLink>
        </Grid>

        <Grid item>
          <HeaderNavMenu links={links} />
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <LanguageIcon />
          </IconButton>

          <AuthZoomButton t={t} />
        </Grid>
      </Grid>

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
    </Container>
  );
}

export default Header;
