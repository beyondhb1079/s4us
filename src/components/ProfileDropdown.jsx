import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

export default function ProfileDropdown(props) {
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
      <Avatar alt="Remy Sharp" src={photo} onClick={handleClick} />
      <StyledMenu
        keepMounted
        anchorEl={dropMenu}
        open={Boolean(dropMenu)}
        onClose={handleClose}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={2}>
            <Avatar alt="Remy Sharp" src={photo} />
          </Grid>
          <Grid item xs={12} sm={10}>
            <Typography variant="h6" component="h4" gutterBottom>
              {name}
            </Typography>
            <Typography component="h6" gutterBottom>
              {email}
            </Typography>
            <a href="/home">Manage Your Profile</a>
          </Grid>
        </Grid>
        <Divider light />
        <MenuItem>
          <ListItemIcon>
            <NewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="New" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <BookmarkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Saved" />
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DoneIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Applied" />
        </MenuItem>
        <Divider light />
        <MenuItem onClick={signOut}>
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
