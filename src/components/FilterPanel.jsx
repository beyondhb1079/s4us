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
  Container,
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
      badge: filterVals.majors?.length,
      wasChanged: JSON.stringify(filterVals.majors) !== JSON.stringify(majors),
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
      badge:
        filterVals.minAmount && filterVals.maxAmount
          ? 2
          : filterVals.minAmount || filterVals.maxAmount
          ? 1
          : 0,
      wasChanged:
        filterVals.minAmount !== minAmount ||
        filterVals.maxAmount !== maxAmount,
    },
    'Grade Level': {
      comp: (
        <GradeLevelFilter
          grades={new Set(filterVals.grades)}
          changeFn={(e) => setFilterVals({ ...filterVals, grades: e })}
        />
      ),
      badge: filterVals.grades?.length,
      wasChanged: JSON.stringify(filterVals.grades) !== JSON.stringify(grades),
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
        sx={{
          display: { md: 'none' },
          justifyContent: 'space-between',
          width: '50%',
        }}>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>

        <Typography>Filters</Typography>
      </Toolbar>

      {Object.entries(filters).map(([name, filter]) => (
        <Accordion key={name} disableGutters>
          <Container maxWidth="sm" disableGutters>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={name + '-content'}
              id={name + '-header'}>
              <Grid
                container
                alignItems="center"
                justifyContent="space-between">
                <Typography>{name}</Typography>
                <Badge
                  badgeContent={filter.badge}
                  color={filter.wasChanged ? 'warning' : 'primary'}
                  sx={{ mr: 2 }}
                />
              </Grid>
            </AccordionSummary>
          </Container>

          <Container maxWidth="sm" disableGutters>
            <AccordionDetails>{filter.comp}</AccordionDetails>
          </Container>
        </Accordion>
      ))}

      <Toolbar sx={{ justifyContent: 'space-evenly', mt: 2 }}>
        <Button
          variant="contained"
          disabled={
            !filters.Major.wasChanged &&
            !filters.Amount.wasChanged &&
            !filters['Grade Level'].wasChanged
          }
          onClick={() => {
            setQueryParams(filterVals);
            onClose();
          }}>
          Apply Filters
        </Button>
        <Button
          onClick={resetFilters}
          disabled={
            !filters.Major.badge &&
            !filters.Amount.badge &&
            !filters['Grade Level'].badge
          }>
          Clear Filters
        </Button>
      </Toolbar>
    </Box>
  );
}

FilterPanel.propTypes = {
  onClose: PropTypes.func.isRequired,
};
