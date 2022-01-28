import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import PropTypes from 'prop-types';
import qParams from '../lib/QueryParams';
import AmountFilter from './AmountFilter';
import GradeLevelFilter from './GradeLevelFilter';
import MajorFilter from './MajorFilter';

export default function FilterPanel({
  setQueryParam,
  queryParams: { minAmount, maxAmount, grades, majors },
}) {
  const filters = {
    Major: (
      <MajorFilter
        majors={majors}
        onSelect={(m) => setQueryParam(qParams.MAJORS, m)}
        onDelete={(m) =>
          setQueryParam(
            qParams.MAJORS,
            majors.filter((major) => major !== m)
          )
        }
      />
    ),
    Amount: (
      <AmountFilter
        min={minAmount ?? 0}
        max={maxAmount ?? 0}
        onMinChange={(e) => setQueryParam(qParams.MIN_AMOUNT, e.target.value)}
        onMaxChange={(e) => setQueryParam(qParams.MAX_AMOUNT, e.target.value)}
      />
    ),
    Grade: (
      <GradeLevelFilter
        grades={new Set(grades)}
        changeFn={(e) => setQueryParam(qParams.GRADES, e)}
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

FilterPanel.propTypes = {
  setQueryParam: PropTypes.func.isRequired,
  queryParams: PropTypes.shape({
    minAmount: PropTypes.number,
    maxAmount: PropTypes.number,
    sortBy: PropTypes.string,
  }),
};
FilterPanel.defaultProps = {
  queryParams: {},
};
