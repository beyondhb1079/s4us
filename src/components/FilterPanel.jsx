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
  Stack,
} from '@mui/material';
import useQueryParams from '../lib/useQueryParams';
import AmountFilter from './AmountFilter';
import GradeLevelFilter from './GradeLevelFilter';
import MajorFilter from './MajorFilter';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import PropTypes from 'prop-types';

export default function FilterPanel({ onClose }) {
  const [params, setQueryParams] = useQueryParams();

  const [minAmount, setMinAmount] = useState(params.minAmount);
  const [maxAmount, setMaxAmount] = useState(params.maxAmount);
  const [grades, setGrades] = useState(params.grades);
  const [majors, setMajors] = useState(params.majors);

  const filters = {
    Major: {
      comp: <MajorFilter majors={majors} onChange={setMajors} />,
      changed:
        JSON.stringify(majors?.length > 0 ? majors : undefined) !==
        JSON.stringify(params.majors),
    },
    Amount: {
      comp: (
        <AmountFilter
          min={minAmount ?? 0}
          max={maxAmount ?? 0}
          onMinChange={(val) => setMinAmount(parseInt(val))}
          onMaxChange={(val) => setMaxAmount(parseInt(val))}
        />
      ),
      changed:
        (minAmount || undefined) !== params.minAmount ||
        (maxAmount || undefined) !== params.maxAmount,
    },
    'Grade Level': {
      comp: <GradeLevelFilter grades={new Set(grades)} onChange={setGrades} />,
      changed:
        JSON.stringify(grades?.length > 0 ? grades : undefined) !==
        JSON.stringify(params.grades),
    },
  };

  const filtersChanged = Object.keys(filters).some((k) => filters[k].changed);

  return (
    <Box>
      <Toolbar
        disableGutters
        sx={{ display: { md: 'none' }, justifyContent: 'space-between' }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>

        <Typography>Filters</Typography>

        <Button disabled>Reset</Button>
      </Toolbar>

      {Object.entries(filters).map(([name, filter]) => (
        <Accordion key={name} disableGutters>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={name + '-content'}
            id={name + '-header'}>
            <Typography>{name}</Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ m: 1 }}>{filter.comp}</AccordionDetails>
        </Accordion>
      ))}

      {filtersChanged && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 2,
          }}>
          <WarningAmberOutlinedIcon color="warning" />
          <Typography>Your changes have not yet been applied.</Typography>
        </Box>
      )}

      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
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
    </Box>
  );
}

FilterPanel.propTypes = {
  onClose: PropTypes.func.isRequired,
};
