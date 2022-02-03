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
  const [{ minAmount, maxAmount, grades, majors }] = useQueryParams();
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
            majors: filerVals.majors.filter((major) => major !== m),
          })
        }
      />
    ),
    Amount: (
      <AmountFilter
        min={filterVals.minAmount ?? 0}
        max={filterVals.maxAmount ?? 0}
        onMinChange={(val) => setFilterVals({ ...filterVals, minAmount: val })}
        onMaxChange={(val) => setFilterVals({ ...filterVals, maxAmount: val })}
      />
    ),
    'Grade Level': (
      <GradeLevelFilter
        grades={new Set(filterVals.grades)}
        changeFn={(e) => setFilterVals({ ...filterVals, grades: e })}
      />
    ),
  };

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

          <AccordionDetails sx={{ m: 1 }}>{filter}</AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

FilterPanel.propTypes = {
  onClose: PropTypes.func.isRequired,
};
