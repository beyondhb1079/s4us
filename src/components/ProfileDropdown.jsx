import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import withStyles from '@mui/styles/withStyles';
import makeStyles from '@mui/styles/makeStyles';
import { Avatar, Divider, Grid, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import NewIcon from '@mui/icons-material/NewReleases';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DoneIcon from '@mui/icons-material/Done';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
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
    <StyledMenu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}>
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
          {experiments.expShowFullProfileMenu && (
            <a href={manageProfileLink}>Manage Your Profile</a>
          )}
        </Grid>
      </Grid>
      <Divider className={classes.dividerSpacing} />
      {experiments.expShowFullProfileMenu && (
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
  );
}

ProfileDropdown.propTypes = {
  anchorEl: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
