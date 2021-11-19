import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { withStyles } from '@mui/styles';
import {
  Avatar,
  Divider,
  Grid,
  ListItemIcon,
  ListItemText,
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
const StyledMenu = withStyles((theme) => ({
  paper: {
    border: '1px solid black',
    width: '350px',
    background: theme.palette.background.default,
  },
  // placing dropdown menu below the avatar
}))((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));

export default function ProfileDropdown(props) {
  const { anchorEl, handleClose } = props;
  const user = firebase.auth().currentUser;

  // needs to be updated once there is a working manage profile page
  const manageProfileLink = '/home';

  function createMenuItem(text, icon, task) {
    return (
      <MenuItem onClick={task} sx={{ paddingY: 1 }}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </MenuItem>
    );
  }

  const signUserOut = () => firebase.auth().signOut();

  return (
    <StyledMenu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}>
      <Grid container spacing={2} sx={{ padding: 1 }}>
        <Grid item sx={{ alignSelf: 'center' }}>
          <Avatar src={user.photoURL} sx={{ height: 48, width: 48 }} />
        </Grid>
        <Grid>
          <Typography variant="h6" component="h4">
            {user.displayName}
          </Typography>
          <Typography component="h6" gutterBottom>
            {user.email}
          </Typography>
          {experiments.expShowFullProfileMenu && (
            <a href={manageProfileLink}>Manage Your Profile</a>
          )}
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 1 }} />
      {experiments.expShowFullProfileMenu && (
        <>
          {createMenuItem('New', <NewIcon fontSize="medium" />)}
          {createMenuItem('Saved', <BookmarkIcon fontSize="medium" />)}
          {createMenuItem('Applied', <DoneIcon fontSize="medium" />)}
          <Divider sx={{ marginY: 1 }} />
        </>
      )}
      {createMenuItem(
        'Logout',
        <ExitToAppIcon fontSize="medium" />,
        signUserOut
      )}
    </StyledMenu>
  );
}

ProfileDropdown.propTypes = {
  anchorEl: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
