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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PropTypes from 'prop-types';
import GradeLevel from '../types/GradeLevel';

function getSummary(filters) {
  const { grades, majors, minAmount, maxAmount } = filters;

  if (grades?.length) {
    if (grades.length >= 2)
      return `${GradeLevel.toString(grades[0])} & ${
        grades.length - 1
      } other(s)`;
    else return `${GradeLevel.toString(grades[0])}`;
  }

  if (majors?.length) {
    if (majors.length >= 2)
      return `${majors[0]} & ${majors.length - 1} other(s)`;
    else return `${majors[0]}`;
  }

  if (minAmount && maxAmount) return 'Min & Max set';
  if (minAmount && !maxAmount) return 'Min set';
  if (maxAmount && !minAmount) return 'Max set';

  return '';
}

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

function AccordionFilter({ name, defaultExpanded, summary, children }) {
  return (
    <Accordion key={name} disableGutters defaultExpanded={defaultExpanded}>
      <Container maxWidth="sm" disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={name + '-content'}
          id={name + '-header'}
          sx={{
            '& .MuiAccordionSummary-content': {
              justifyContent: 'space-between',
            },
          }}>
          <Typography>{name}</Typography>
          <Typography
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              width: { xs: 220, md: 120 },
              mr: 2,
              fontStyle: 'italic',
            }}>
            {summary}
          </Typography>
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
  summary: PropTypes.string,
  children: PropTypes.node.isRequired,
};

AccordionFilter.defaultProps = {
  defaultExpanded: false,
  summary: undefined,
};

export default function FilterPanel({ onClose }) {
  const [dialogOpen, setDialogOpen] = useState(false);
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

  const filters = {
    Major: {
      comp: <MajorFilter majors={majors} onChange={setMajors} />,
      changed:
        JSON.stringify(majors || []) !== JSON.stringify(params.majors || []),
      summary: getSummary({ majors }),
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
      summary: getSummary({ minAmount, maxAmount }),
    },
    'Grade Level': {
      comp: <GradeLevelFilter grades={new Set(grades)} onChange={setGrades} />,
      changed:
        JSON.stringify(grades || []) !== JSON.stringify(params.grades || []),
      summary: getSummary({ grades }),
    },
  };

  const isAnyFilterActive =
    minAmount || maxAmount || grades?.length > 0 || majors?.length > 0;

  const someParamFilters =
    params.minAmount ||
    params.maxAmount ||
    params.grades?.length > 0 ||
    params.majors?.length > 0;

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

      {someParamFilters && (
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
        <AccordionFilter name={name} summary={filter.summary}>
          {filter.comp}
        </AccordionFilter>
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
};
