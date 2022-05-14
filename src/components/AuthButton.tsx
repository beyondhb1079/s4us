import { Avatar, Button, Grow, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import useAuth from '../lib/useAuth';
import ProfileDropdown from './ProfileDropdown';

export default function AuthButton(): JSX.Element {
  const { t } = useTranslation('common');
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
      <ProfileDropdown anchorEl={anchorEl} onClose={() => setAnchorEl(null)} />
    </>
  );
}
