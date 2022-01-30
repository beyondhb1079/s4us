import React from 'react';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import useQueryParams from '../lib/useQueryParams';
import AmountFilter from './AmountFilter';
import GradeLevelFilter from './GradeLevelFilter';
import MajorFilter from './MajorFilter';

export default function FilterPanel() {
  const [{ minAmount, maxAmount, grades, majors }, setQueryParam] =
    useQueryParams();

  const filters = {
    Major: (
      <MajorFilter
        majors={majors}
        onSelect={(m) => setQueryParam('majors', m)}
        onDelete={(m) =>
          setQueryParam(
            'majors',
            majors.filter((major) => major !== m)
          )
        }
      />
    ),
    Amount: (
      <AmountFilter
        min={minAmount ?? 0}
        max={maxAmount ?? 0}
        onMinChange={(e) => setQueryParam('minAmount', e.target.value)}
        onMaxChange={(e) => setQueryParam('maxAmount', e.target.value)}
        onSliderChange={(e) => {
          setQueryParam('minAmount', e.target.value[0]);
          setQueryParam('maxAmount', e.target.value[1]);
        }}
      />
    ),
    'Grade Level': (
      <GradeLevelFilter
        grades={new Set(grades)}
        changeFn={(e) => setQueryParam('grades', e)}
      />
    ),
  };

  return (
    <Box>
      {Object.entries(filters).map(([name, filter]) => (
        <Accordion key={name} disableGutters>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={name + '-content'}
            id={name + '-header'}>
            <Typography>{name}</Typography>
          </AccordionSummary>

          <AccordionDetails>{filter}</AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
