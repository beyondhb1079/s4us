import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
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
import ScholarshipsContext from '../models/ScholarshipsContext';
import ScholarshipData from '../types/ScholarshipData';
import Model from '../models/base/Model';

function EditScholarship(): JSX.Element {
  const { id } = useParams();
  const [scholarship, setScholarship] = useState<
    Model<ScholarshipData> | undefined
  >(undefined);
  const [error, setError] = useState<string>();
  const [delError, setDelError] = useState<string>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch the scholarship
  useEffect(() => {
    let mounted = true;

    Scholarships.id(id as string)
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
    if (
      authorId &&
      authorId !== currentUser?.uid &&
      !(claims?.admin as boolean)
    ) {
      setError("You don't have permission to edit this scholarship.");
    }
  }, [scholarship, currentUser, claims]);

  const { invalidate } = useContext(ScholarshipsContext);
  const handleDelete = () => {
    Scholarships.id(id as string)
      .delete()
      .then(() => {
        invalidate(id);
        navigate('/', {
          state: {
            alert: {
              message: `Successfully deleted "${scholarship?.data.name}"`,
            },
          },
        });
      })
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
    <Box sx={{ p: 2 }}>
      <Helmet>
        <title>Edit a scholarship</title>
      </Helmet>

      <>
        <Container maxWidth="xl">
          <ScholarshipForm scholarship={scholarship} />
        </Container>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: 1 }}>
          <Button color="error" onClick={() => setDialogOpen(true)}>
            Delete Scholarship
          </Button>
        </Box>

        {delError && (
          <Alert severity="error" onClose={() => setDelError(undefined)}>
            <AlertTitle>Error deleting scholarship</AlertTitle>
            {delError.toString()}
          </Alert>
        )}
      </>

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
    </Box>
  );
}

export default EditScholarship;
