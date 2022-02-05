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
  Badge,
  Grid,
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
    Major: {
      comp: (
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
      badge: majors?.length,
    },
    Amount: {
      comp: (
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
      badge: minAmount && maxAmount ? 2 : minAmount || maxAmount ? 1 : 0,
    },
    'Grade Level': {
      comp: (
        <GradeLevelFilter
          grades={new Set(filterVals.grades)}
          changeFn={(e) => setFilterVals({ ...filterVals, grades: e })}
        />
      ),
      badge: grades?.length,
    },
  };

  function resetFilters() {
    setFilterVals({
      minAmount: undefined,
      maxAmount: undefined,
      grades: undefined,
      majors: undefined,
    });
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
            <Grid container alignItems="center" justifyContent="space-between">
              <Typography>{name}</Typography>
              <Badge
                badgeContent={filter.badge}
                color="primary"
                sx={{ mr: 2 }}
              />
            </Grid>
          </AccordionSummary>

          <AccordionDetails sx={{ m: 1 }}>{filter.comp}</AccordionDetails>
        </Accordion>
      ))}

      <Toolbar
        sx={{ justifyContent: { xs: 'center', md: 'space-between' }, mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => {
            setQueryParams(filterVals);
            onClose();
          }}>
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
