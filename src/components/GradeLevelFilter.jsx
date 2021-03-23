import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  popOverWindow: {
    margin: theme.spacing(1),
    minWidth: '250px',
    maxWidth: '500px',
  },
}));

const gradeOptions = [
  { title: '12th - High School' },
  { title: 'College Freshman' },
  { title: 'College Sophomore' },
  { title: 'College Junior' },
  { title: 'College Senior' },
  { title: '5th Year' },
  { title: 'Post Grad' },
];

export default function GradeLevelFilter() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        Open Popover
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <Autocomplete
          className={classes.popOverWindow}
          multiple
          limitTags={1}
          options={gradeOptions}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label=" Grade"
              placeholder="Others"
            />
          )}
        />
      </Popover>
    </div>
  );
}
