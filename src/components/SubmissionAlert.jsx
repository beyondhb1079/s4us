import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, AlertTitle, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

function SubmissionAlert({ id, name, onClose }) {
  return (
    <Alert
      severity="success"
      action={
        <>
          <Button
            color="inherit"
            size="medium"
            component={Link}
            to={`/scholarships/${id}`}>
            VIEW
          </Button>
          <IconButton size="medium" color="inherit" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }>
      <AlertTitle>Success</AlertTitle>
      {`${name} submitted successfully.`}
    </Alert>
  );
}

SubmissionAlert.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SubmissionAlert;
