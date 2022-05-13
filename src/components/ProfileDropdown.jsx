import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Divider,
  Grid,
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
import { signOut } from 'firebase/auth';

// hacky way to override Menu style
const StyledMenu = (props) => (
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

const StyledMenuItem = ({ icon: Icon, text, onClick }) => (
  <MenuItem onClick={onClick} sx={{ py: 1 }}>
    <Icon sx={{ mr: 1.5 }} />
    {text}
  </MenuItem>
);

StyledMenuItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default function ProfileDropdown(props) {
  const { anchorEl, onClose } = props;
  const { currentUser: user } = useAuth();
  const { t } = useTranslation('common');

  // needs to be updated once there is a working manage profile page
  const manageProfileLink = '/home';

  const signUserOut = () => {
    onClose();
    signOut();
  };
  const navigate = useNavigate();

  return (
    <StyledMenu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={onClose}>
      <Grid container spacing={2} sx={{ px: 2, py: 1 }}>
        <Grid item sx={{ alignSelf: 'center' }}>
          {/* or use alignItems? */}
          <Avatar src={user?.photoURL} sx={{ height: 48, width: 48 }} />
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
  );
}

ProfileDropdown.propTypes = {
  anchorEl: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
