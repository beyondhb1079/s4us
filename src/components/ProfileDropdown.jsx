import React from 'react';
import PropTypes from 'prop-types';
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
import { EXPERIMENTAL_VERSION } from '../config/constants';

// hacky way to override Menu style
const StyledMenu = withStyles({
  paper: {
    border: '1px solid black',
    width: '350px',
    background: '#F3F6FA',
  },
  // placing dropdown menu below the avatar
})((props) => (
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
    width: '48px',
    height: '48px',
  },
  large: {
    width: '60px',
    height: '60px',
  },
}));

export default function ProfileDropdown(props) {
  const classes = useStyles();
  const { signOut, name, email, photo } = props;
  const [dropMenu, setDropMenu] = React.useState(null);

  const handleClick = (event) => setDropMenu(event.currentTarget);

  const handleClose = () => setDropMenu(null);

  const display = {
    0: {
      manageProfile: (
        <>
          {EXPERIMENTAL_VERSION ? null : (
            <a href="/home">Manage Your Profile</a>
          )}
        </>
      ),
      navigation: (
        <>
          {EXPERIMENTAL_VERSION ? null : (
            <>
              <MenuItem className={classes.menuListItem}>
                <ListItemIcon>
                  <NewIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="New" />
              </MenuItem>
              <MenuItem className={classes.menuListItem}>
                <ListItemIcon>
                  <BookmarkIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Saved" />
              </MenuItem>
              <MenuItem className={classes.menuListItem}>
                <ListItemIcon>
                  <DoneIcon fontSize="medium" />
                </ListItemIcon>
                <ListItemText primary="Applied" />
              </MenuItem>
            </>
          )}
        </>
      ),
    },
  };

  return (
    <>
      <Avatar src={photo} onClick={handleClick} />
      <StyledMenu
        anchorEl={dropMenu}
        keepMounted
        open={Boolean(dropMenu)}
        onClose={handleClose}>
        <Grid container spacing={2} className={classes.gridRoot}>
          <Grid item className={classes.profilePic}>
            <Avatar src={photo} className={classes.medium} />
          </Grid>
          <Grid>
            <Typography variant="h6" component="h4">
              {name}
            </Typography>
            <Typography component="h6" gutterBottom>
              {email}
            </Typography>
            {display[0].manageProfile}
          </Grid>
        </Grid>
        <Divider className={classes.dividerSpacing} />
        {display[0].navigation}
        <Divider className={classes.dividerSpacing} />
        <MenuItem onClick={signOut} className={classes.menuListItem}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="medium" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </StyledMenu>
    </>
  );
}

ProfileDropdown.propTypes = {
  signOut: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};
