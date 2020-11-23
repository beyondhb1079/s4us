import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Container,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NewIcon from '@material-ui/icons/NewReleases';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import DoneIcon from '@material-ui/icons/Done';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

// hacky way to override Menu style
const StyledMenu = withStyles({
  paper: {
    border: '2px solid #d3d4d5',
    width: '300px',
    background: '#f2f5fa',
  },
})(Menu);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '10px',
    marginBottom: '15px',
  },
  menuList: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  profilePic: {
    alignSelf: 'center',
  },
  medium: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

export default function ProfileDropdown(props) {
  const classes = useStyles();
  const { signOut, name, email, photo } = props;
  const [dropMenu, setDropMenu] = React.useState(null);

  const handleClick = (event) => {
    setDropMenu(event.currentTarget);
  };

  const handleClose = () => {
    setDropMenu(null);
  };

  return (
    <Container>
      <Avatar src={photo} onClick={handleClick} className={classes.large} />
      <StyledMenu
        keepMounted
        anchorEl={dropMenu}
        open={Boolean(dropMenu)}
        onClose={handleClose}>
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={3} sm={3} className={classes.profilePic}>
            <Avatar src={photo} className={classes.medium} />
          </Grid>
          <Grid item xs={9} sm={9}>
            <Typography variant="h6" component="h4" gutterBottom>
              {name}
            </Typography>
            <Typography component="h6" gutterBottom>
              {email}
            </Typography>
            <a href="/home">Manage Your Profile</a>
          </Grid>
        </Grid>
        <Divider />
        <MenuItem className={classes.menuList}>
          <ListItemIcon>
            <NewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="New" />
        </MenuItem>
        <MenuItem className={classes.menuList}>
          <ListItemIcon>
            <BookmarkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Saved" />
        </MenuItem>
        <MenuItem className={classes.menuList}>
          <ListItemIcon>
            <DoneIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Applied" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={signOut} className={classes.menuList}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </StyledMenu>
    </Container>
  );
}

ProfileDropdown.propTypes = {
  signOut: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
};
