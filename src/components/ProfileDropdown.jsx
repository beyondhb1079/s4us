import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Avatar, Divider, Grid, Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NewIcon from '@material-ui/icons/NewReleases';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import DoneIcon from '@material-ui/icons/Done';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { EXPERIMENT_SHOW_FULL_PROFILE_MENU } from '../config/constants';

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

const useStyles = makeStyles((theme) => ({
  gridRoot: {
    padding: theme.spacing(1),
  },
  menuListItem: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  dividerSpacing: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  profilePic: {
    alignSelf: 'center',
  },
  medium: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

export default function ProfileDropdown(props) {
  const { anchorEl, handleClose } = props;
  const classes = useStyles();
  const user = firebase.auth().currentUser;

  const closeDropMenu = () => handleClose(null);

  // needs to be updated once there is a working manage profile page
  const manageProfileLink = '/home';

  function createMenuItem(text, icon, task) {
    return (
      <MenuItem onClick={task} className={classes.menuListItem}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </MenuItem>
    );
  }

  const signUserOut = () => firebase.auth().signOut();

  return (
    <>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeDropMenu}>
        <Grid container spacing={2} className={classes.gridRoot}>
          <Grid item className={classes.profilePic}>
            <Avatar src={user.photoURL} className={classes.medium} />
          </Grid>
          <Grid>
            <Typography variant="h6" component="h4">
              {user.displayName}
            </Typography>
            <Typography component="h6" gutterBottom>
              {user.email}
            </Typography>
            {EXPERIMENT_SHOW_FULL_PROFILE_MENU && (
              <a href={manageProfileLink}>Manage Your Profile</a>
            )}
          </Grid>
        </Grid>
        <Divider className={classes.dividerSpacing} />
        {EXPERIMENT_SHOW_FULL_PROFILE_MENU && (
          <>
            {createMenuItem('New', <NewIcon fontSize="medium" />)}
            {createMenuItem('Saved', <BookmarkIcon fontSize="medium" />)}
            {createMenuItem('Applied', <DoneIcon fontSize="medium" />)}
            <Divider className={classes.dividerSpacing} />
          </>
        )}
        {createMenuItem(
          'Logout',
          <ExitToAppIcon fontSize="medium" />,
          signUserOut
        )}
      </StyledMenu>
    </>
  );
}

ProfileDropdown.propTypes = {
  anchorEl: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
