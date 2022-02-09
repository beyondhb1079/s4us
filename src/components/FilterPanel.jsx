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
  Chip,
  Container,
  Alert,
} from '@mui/material';
import useQueryParams from '../lib/useQueryParams';
import AmountFilter from './AmountFilter';
import GradeLevelFilter from './GradeLevelFilter';
import MajorFilter from './MajorFilter';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

export default function FilterPanel({ onClose }) {
  const [params, setQueryParams] = useQueryParams();

  const [minAmount, setMinAmount] = useState(params.minAmount);
  const [maxAmount, setMaxAmount] = useState(params.maxAmount);
  const [grades, setGrades] = useState(params.grades);
  const [majors, setMajors] = useState(params.majors);

  const filters = {
    Major: {
      comp: (
        <MajorFilter
          majors={majors}
          onSelect={(m) => setMajors(m)}
          onDelete={(m) => setMajors(majors.filter((major) => major !== m))}
        />
      ),
      count: params.majors?.length ?? 0,
      wasChanged:
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
      count:
        params.minAmount && params.maxAmount
          ? 2
          : params.minAmount || params.maxAmount
          ? 1
          : 0,
      wasChanged:
        (minAmount || undefined) !== params.minAmount ||
        (maxAmount || undefined) !== params.maxAmount,
    },
    'Grade Level': {
      comp: (
        <GradeLevelFilter
          grades={new Set(grades)}
          changeFn={(e) => setGrades(e)}
        />
      ),
      count: params.grades?.length ?? 0,
      wasChanged:
        JSON.stringify(grades?.length > 0 ? grades : undefined) !==
        JSON.stringify(params.grades),
    },
  };

  function resetFilters() {
    setMinAmount(undefined);
    setMaxAmount(undefined);
    setGrades(undefined);
    setMajors(undefined);
  }

  function cancelChanges() {
    setMinAmount(params.minAmount);
    setMaxAmount(params.maxAmount);
    setGrades(params.grades);
    setMajors(params.majors);
  }

  const filtersChanged =
    filters.Major.wasChanged ||
    filters.Amount.wasChanged ||
    filters['Grade Level'].wasChanged;

  return (
    <Box>
      <Toolbar
        disableGutters
        sx={{
          justifyContent: 'space-between',
          alignContent: 'flex-end',
        }}>
        <IconButton onClick={onClose} sx={{ visibility: { md: 'hidden' } }}>
          <CloseIcon />
        </IconButton>

        <Typography>Filters</Typography>

        <Button
          disabled={
            !params.minAmount &&
            !params.maxAmount &&
            (!params.grades || params.grades?.length === 0) &&
            (!params.majors || params.majors?.length === 0)
          }
          onClick={resetFilters}>
          Reset
        </Button>
      </Toolbar>

      {Object.entries(filters).map(([name, filter]) => (
        <Accordion key={name} disableGutters>
          <Container maxWidth="sm" disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={name + '-content'}
              id={name + '-header'}>
              <Typography>{name}</Typography>
              {filter.count > 0 && (
                <Chip
                  label={`${filter.count} applied`}
                  color="primary"
                  size="small"
                  sx={{ ml: 2 }}
                />
              )}
            </AccordionSummary>
          </Container>

          <Container maxWidth="sm" disableGutters>
            <AccordionDetails>{filter.comp}</AccordionDetails>
          </Container>
        </Accordion>
      ))}

      {filtersChanged && (
        <Alert severity="warning">Your changes have not yet been applied</Alert>
      )}

      <Toolbar sx={{ justifyContent: 'space-evenly', mt: 2 }}>
        <Button
          variant="contained"
          disabled={!filtersChanged}
          onClick={() => {
            setQueryParams({ minAmount, maxAmount, grades, majors });
            onClose();
          }}>
          Apply
        </Button>
        <Button onClick={cancelChanges} disabled={!filtersChanged}>
          Cancel
        </Button>
      </Toolbar>
    </Box>
  );
}

FilterPanel.propTypes = {
  onClose: PropTypes.func.isRequired,
};
