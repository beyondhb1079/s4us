import React from 'react';
import { Stack } from '@mui/material';
import PropTypes from 'prop-types';
import qParams from '../lib/QueryParams';
import AmountFilter from './AmountFilter';
import GradeLevelFilter from './GradeLevelFilter';
import MajorFilter from './MajorFilter';

export default function FilterPanel({
  setQueryParam,
  queryParams: { minAmount, maxAmount, grades, majors },
}) {
  return (
    <Stack spacing={2}>
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

      <GradeLevelFilter
        grades={new Set(grades)}
        changeFn={(e) => setQueryParam(qParams.GRADES, e)}
      />

      <AmountFilter
        min={minAmount ?? 0}
        max={maxAmount ?? 0}
        onMinChange={(e) => setQueryParam(qParams.MIN_AMOUNT, e.target.value)}
        onMaxChange={(e) => setQueryParam(qParams.MAX_AMOUNT, e.target.value)}
      />
    </Stack>
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
