import React from 'react';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import useQueryParams from '../lib/useQueryParams';
import AmountFilter from './AmountFilter';
import GradeLevelFilter from './GradeLevelFilter';
import MajorFilter from './MajorFilter';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

export default function FilterPanel({ closePanel }) {
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
      />
    ),
    Grade: (
      <GradeLevelFilter
        grades={new Set(grades)}
        changeFn={(e) => setQueryParam('grades', e)}
      />
    ),
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ display: { md: 'none' }, my: 1 }}>
        <IconButton onClick={closePanel}>
          <CloseIcon />
        </IconButton>

        <Typography>Filters</Typography>

        <Button>Reset</Button>
      </Stack>

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

FilterPanel.propTypes = {
  closePanel: PropTypes.func.isRequired,
};
