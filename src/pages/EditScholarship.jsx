import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
  AlertTitle,
} from '@mui/material';
import ScholarshipForm from '../components/ScholarshipForm';
import Scholarships from '../models/Scholarships';
import { Helmet } from 'react-helmet';
import useAuth from '../lib/useAuth';

function EditScholarship() {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState(undefined);
  const [error, setError] = useState();
  const [delError, setDelError] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch the scholarship
  useEffect(() => {
    let mounted = true;

    Scholarships.id(id)
      .get()
      .then((s) => mounted && setScholarship(s))
      .catch((e) => mounted && setError(e));

    return () => {
      mounted = false;
    };
  }, [id]);

  const { claims, currentUser } = useAuth();
  useEffect(() => {
    const authorId = scholarship?.data?.author?.id;
    if (authorId && authorId !== currentUser?.uid && !claims?.admin) {
      setError("You don't have permission to edit this scholarship.");
    }
  }, [scholarship, currentUser, claims]);

  const handleDelete = () => {
    Scholarships.id(id)
      .delete()
      .then(() =>
        navigate('/', {
          state: {
            alert: {
              message: `Successfully deleted "${scholarship.data.name}"`,
            },
          },
        })
      )
      .catch(setDelError)
      .finally(() => setDialogOpen(false));
  };

  if (error || !scholarship) {
    return (
      <Container sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom align="center">
          {error?.toString() || 'Loading...'}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Helmet>
        <title>Edit a scholarship</title>
      </Helmet>

      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 } }}>
        <ScholarshipForm scholarship={scholarship} />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 1 }}>
          <Button color="error" onClick={() => setDialogOpen(true)}>
            Delete Scholarship
          </Button>
        </Box>

        {delError && (
          <Alert
            severity="error"
            onClose={() => {
              setDelError(null);
            }}>
            <AlertTitle>Error deleting scholarship</AlertTitle>
            {delError.toString()}
          </Alert>
        )}
      </Paper>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Delete scholarship?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action will permanently delete "{scholarship.data.name}" and
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default EditScholarship;
