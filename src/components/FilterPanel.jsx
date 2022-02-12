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
} from '@mui/material';
import useQueryParams from '../lib/useQueryParams';
import AmountFilter from './AmountFilter';
import GradeLevelFilter from './GradeLevelFilter';
import MajorFilter from './MajorFilter';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PropTypes from 'prop-types';
import GradeLevel from '../types/GradeLevel';

function FilterChip({ label, onClick, disabled }) {
  return (
    <Chip
      icon={!disabled && <CheckCircleIcon />}
      key={label}
      {...{ label, onClick, disabled }}
      color={disabled ? 'secondary' : 'primary'}
      size="small"
      sx={{ mr: 1, mb: 1 }}
    />
  );
}

FilterChip.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
FilterChip.defaultProps = {
  onClick: undefined,
  disabled: false,
};

function AccordionFilter({ name, defaultExpanded, children }) {
  return (
    <Accordion key={name} disableGutters defaultExpanded={defaultExpanded}>
      <Container maxWidth="sm" disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={name + '-content'}
          id={name + '-header'}>
          <Typography sx={{ mr: 2 }}>{name}</Typography>
        </AccordionSummary>
      </Container>

      <Container maxWidth="sm" disableGutters>
        <AccordionDetails>{children}</AccordionDetails>
      </Container>
    </Accordion>
  );
}

AccordionFilter.propTypes = {
  name: PropTypes.string.isRequired,
  defaultExpanded: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

AccordionFilter.defaultProps = {
  defaultExpanded: false,
};

export default function FilterPanel({ onClose }) {
  const [params, setQueryParams] = useQueryParams();

  const [minAmount, setMinAmount] = useState(params.minAmount);
  const [maxAmount, setMaxAmount] = useState(params.maxAmount);
  const [grades, setGrades] = useState(params.grades);
  const [majors, setMajors] = useState(params.majors);

  function resetFilters() {
    setMinAmount(undefined);
    setMaxAmount(undefined);
    setGrades(undefined);
    setMajors(undefined);
  }

  const isAnyFilterActive =
    minAmount || maxAmount || grades?.length > 0 || majors?.length > 0;

  const filters = {
    Major: {
      comp: (
        <MajorFilter
          majors={majors}
          onSelect={(m) => setMajors(m)}
          onDelete={(m) => setMajors(majors?.filter((major) => major !== m))}
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

  const filtersChanged =
    filters.Major.wasChanged ||
    filters.Amount.wasChanged ||
    filters['Grade Level'].wasChanged;

  const filterCount =
    filters.Major.count + filters.Amount.count + filters['Grade Level'].count;

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

      {filterCount > 0 && (
        <AccordionFilter name="Active Filters" defaultExpanded>
          {params.majors?.map((e) => (
            <FilterChip
              label={e}
              disabled={!majors?.includes(e)}
              onClick={() => setMajors(majors?.filter((m) => m !== e))}
            />
          ))}
          {Number.isInteger(params.minAmount) && (
            <FilterChip
              label={`Min $${params.minAmount}`}
              disabled={minAmount !== params.minAmount}
              onClick={() => setMinAmount(undefined)}
            />
          )}
          {Number.isInteger(params.maxAmount) && (
            <FilterChip
              label={`Max $${params.maxAmount}`}
              disabled={maxAmount !== params.maxAmount}
              onClick={() => setMaxAmount(undefined)}
            />
          )}
          {params.grades?.map((e) => (
            <FilterChip
              label={GradeLevel.toString(e)}
              disabled={!grades?.includes(e)}
              onClick={() => setGrades(grades?.filter((g) => g !== e))}
            />
          ))}

          {isAnyFilterActive && (
            <Button
              size="small"
              onClick={resetFilters}
              sx={{ textTransform: 'none' }}>
              Clear All
            </Button>
          )}
        </AccordionFilter>
      )}

      {Object.entries(filters).map(([name, filter]) => (
        <AccordionFilter name={name}>{filter.comp}</AccordionFilter>
      ))}

      {filtersChanged && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 2,
          }}>
          <WarningAmberOutlinedIcon color="warning" />
          <Typography>Your changes have not yet been applied</Typography>
        </Box>
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
        <Button
          onClick={() => {
            setMinAmount(params.minAmount);
            setMaxAmount(params.maxAmount);
            setGrades(params.grades);
            setMajors(params.majors);
          }}>
          Cancel
        </Button>
      </Toolbar>
    </Box>
  );
}

FilterPanel.propTypes = {
  onClose: PropTypes.func.isRequired,
};
