import React, { useState } from 'react';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
  Button,
  Toolbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack,
} from '@mui/material';
import useQueryParams from '../lib/useQueryParams';
import AmountFilter from './AmountFilter';
import GradeLevelFilter from './GradeLevelFilter';
import MajorFilter from './MajorFilter';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import PropTypes from 'prop-types';

export default function FilterPanel({ onClose, majors, setMajors }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [params, setQueryParams] = useQueryParams();

  const [minAmount, setMinAmount] = useState(params.minAmount);
  const [maxAmount, setMaxAmount] = useState(params.maxAmount);
  const [grades, setGrades] = useState(params.grades);

  const filters = {
    'What are you studying?': {
      comp: (
        <MajorFilter
          majors={majors}
          onChange={setMajors}
          majorParams={params.majors}
        />
      ),
      changed:
        JSON.stringify(majors || []) !== JSON.stringify(params.majors || []),
    },
    Amount: {
      comp: (
        <AmountFilter
          min={minAmount ?? 0}
          max={maxAmount ?? 0}
          onMinChange={(val) => setMinAmount(parseInt(val) || undefined)}
          onMaxChange={(val) => setMaxAmount(parseInt(val) || undefined)}
        />
      ),
      changed: minAmount !== params.minAmount || maxAmount !== params.maxAmount,
    },
    'Grade Level': {
      comp: <GradeLevelFilter grades={new Set(grades)} onChange={setGrades} />,
      changed:
        JSON.stringify(grades || []) !== JSON.stringify(params.grades || []),
    },
  };

  const filtersChanged = Object.keys(filters).some((k) => filters[k].changed);

  return (
    <Box>
      <Toolbar
        disableGutters
        sx={{
          justifyContent: 'space-between',
          alignContent: 'flex-end',
          width: '50%',
        }}>
        <IconButton
          onClick={() => {
            if (filtersChanged) setDialogOpen(true);
            else onClose();
          }}
          sx={{ visibility: { md: 'hidden' } }}>
          <CloseIcon />
        </IconButton>

        <Typography>Filters</Typography>
      </Toolbar>

      {Object.entries(filters).map(([name, filter]) => (
        <Accordion key={name} disableGutters>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={name + '-content'}
            id={name + '-header'}>
            <Typography sx={{ fontWeight: 'medium' }}>{name}</Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ m: 1 }}>{filter.comp}</AccordionDetails>
        </Accordion>
      ))}

      <Stack direction="row" spacing={1} sx={{ m: 2 }}>
        {filtersChanged ? (
          <WarningAmberOutlinedIcon color="warning" />
        ) : (
          <CheckCircleOutlineIcon color="success" />
        )}
        <Typography>
          {filtersChanged
            ? 'Your changes are not yet applied.'
            : 'Your filters are currently applied.'}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ m: 2 }}>
        <Button
          variant="contained"
          disabled={!filtersChanged}
          onClick={() => {
            setQueryParams({ minAmount, maxAmount, grades, majors });
            onClose();
          }}>
          Apply
        </Button>
        <Button
          disabled={!filtersChanged}
          onClick={() => {
            setMinAmount(params.minAmount);
            setMaxAmount(params.maxAmount);
            setGrades(params.grades);
            setMajors(params.majors);
          }}>
          Cancel
        </Button>
      </Stack>

      <Box sx={{ height: { xs: 0, md: 200 } }} />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to close? Your changes will not be saved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={onClose}>
            Yes, Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

FilterPanel.propTypes = {
  onClose: PropTypes.func.isRequired,
  majors: PropTypes.arrayOf(PropTypes.string),
  setMajors: PropTypes.func.isRequired,
};
