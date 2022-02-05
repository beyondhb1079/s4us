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
} from '@mui/material';
import useQueryParams from '../lib/useQueryParams';
import AmountFilter from './AmountFilter';
import GradeLevelFilter from './GradeLevelFilter';
import MajorFilter from './MajorFilter';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

export default function FilterPanel({ onClose }) {
  const [{ minAmount, maxAmount, grades, majors }, setQueryParams] =
    useQueryParams();
  const [filterVals, setFilterVals] = useState({
    minAmount,
    maxAmount,
    grades,
    majors,
  });

  const filters = {
    Major: (
      <MajorFilter
        majors={filterVals.majors}
        onSelect={(m) => setFilterVals({ ...filterVals, majors: m })}
        onDelete={(m) =>
          setFilterVals({
            ...filterVals,
            majors: filterVals.majors.filter((major) => major !== m),
          })
        }
      />
    ),
    Amount: (
      <AmountFilter
        min={filterVals.minAmount ?? 0}
        max={filterVals.maxAmount ?? 0}
        onMinChange={(val) =>
          setFilterVals({ ...filterVals, minAmount: parseInt(val) })
        }
        onMaxChange={(val) =>
          setFilterVals({ ...filterVals, maxAmount: parseInt(val) })
        }
      />
    ),
    'Grade Level': (
      <GradeLevelFilter
        grades={new Set(filterVals.grades)}
        changeFn={(e) => setFilterVals({ ...filterVals, grades: e })}
      />
    ),
  };

  function resetFilters() {
    setQueryParams({
      minAmount: undefined,
      maxAmount: undefined,
      grades: undefined,
      majors: undefined,
    });

    setFilterVals({});
  }

  return (
    <Box>
      <Toolbar
        disableGutters
        sx={{ display: { md: 'none' }, justifyContent: 'space-between' }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>

        <Typography>Filters</Typography>

        <Button onClick={resetFilters}>Reset</Button>
      </Toolbar>

      {Object.entries(filters).map(([name, filter]) => (
        <Accordion key={name} disableGutters>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={name + '-content'}
            id={name + '-header'}>
            <Typography>{name}</Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ m: 1 }}>{filter}</AccordionDetails>
        </Accordion>
      ))}

      <Toolbar
        sx={{ justifyContent: { xs: 'center', md: 'space-between' }, mt: 2 }}>
        <Button variant="contained" onClick={() => setQueryParams(filterVals)}>
          Apply Filters
        </Button>
        <Button
          sx={{ display: { xs: 'none', md: 'block' } }}
          onClick={resetFilters}>
          Clear Filters
        </Button>
      </Toolbar>
    </Box>
  );
}

FilterPanel.propTypes = {
  onClose: PropTypes.func.isRequired,
};
