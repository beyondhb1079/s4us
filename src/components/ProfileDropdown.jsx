import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import {
  Avatar,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import {
  Bookmark as BookmarkIcon,
  Done as DoneIcon,
  ExitToApp as ExitToAppIcon,
  NewReleases as NewIcon,
} from '@mui/icons-material';
import experiments from '../lib/experiments';

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
  const user = firebase.auth().currentUser;

  // needs to be updated once there is a working manage profile page
  const manageProfileLink = '/home';

  const signUserOut = () => {
    onClose();
    firebase.auth().signOut();
  };

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
        icon={ExitToAppIcon}
        text="Logout"
        onClick={signUserOut}
      />
    </StyledMenu>
  );
}

ProfileDropdown.propTypes = {
  anchorEl: PropTypes.element,
  onClose: PropTypes.func.isRequired,
};
