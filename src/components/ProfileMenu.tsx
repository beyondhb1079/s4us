import React, { useState } from 'react';
import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DoneIcon from '@mui/icons-material/Done';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import NewIcon from '@mui/icons-material/NewReleases';
import experiments from '../lib/experiments';
import useAuth from '../lib/useAuth';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getAuth, signOut } from 'firebase/auth';

// hacky way to override Menu style
const StyledMenu = (props: any) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
);

type StyledMenuItemProps = {
  icon: React.ElementType;
  text: string;
  onClick?: () => void;
};

const StyledMenuItem = ({
  icon: Icon,
  text,
  onClick,
}: StyledMenuItemProps): JSX.Element => (
  <MenuItem onClick={onClick} sx={{ py: 1 }}>
    <Icon sx={{ mr: 1.5 }} />
    {text}
  </MenuItem>
);

export default function ProfileMenu(): JSX.Element {
  const [anchorEl, setAnchorEl] = useState(null as null | HTMLElement);
  const onClose = () => setAnchorEl(null);

  const { currentUser: user } = useAuth();
  const { t } = useTranslation('common');

  // needs to be updated once there is a working manage profile page
  const manageProfileLink = '/home';

  const signUserOut = () => {
    onClose();
    signOut(getAuth());
  };
  const navigate = useNavigate();

  return (
    <>
      <IconButton
        size="medium"
        aria-label="profile menu"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        color="inherit"
        sx={{ height: '100%', width: 64 }}>
        <Avatar src={user?.photoURL || undefined} />
      </IconButton>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onClose}>
        <Grid container spacing={2} sx={{ px: 2, py: 1 }}>
          <Grid item sx={{ alignSelf: 'center' }}>
            {/* or use alignItems? */}
            <Avatar
              src={user?.photoURL || undefined}
              sx={{ height: 48, width: 48 }}
            />
          </Grid>
          <Grid item>
            <Typography variant="h6" component="h4">
              {user?.displayName}
            </Typography>
            <Typography component="h6" gutterBottom>
              {user?.email}
            </Typography>
            {experiments.expShowFullProfileMenu && (
              <a href={manageProfileLink}>Manage Your Profile</a>
            )}
          </Grid>
        </Grid>
        <Divider sx={{ my: 1 }} />
        {experiments.expShowFullProfileMenu && (
          <>
            <StyledMenuItem icon={NewIcon} text="New" />
            <StyledMenuItem icon={BookmarkIcon} text="Saved" />
            <StyledMenuItem icon={DoneIcon} text="Applied" />
            <Divider sx={{ my: 1 }} />
          </>
        )}
        <StyledMenuItem
          icon={HomeIcon}
          text={t('dashboard')}
          onClick={() => navigate('/')}
        />
        <StyledMenuItem
          icon={ExitToAppIcon}
          text={t('actions.logout')}
          onClick={signUserOut}
        />
      </StyledMenu>
    </>
  );
}
