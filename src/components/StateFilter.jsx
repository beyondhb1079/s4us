import React, { useState } from 'react';
import useQueryParams from '../lib/useQueryParams';
import AutocompleteFilter from './AutocompleteFilter';
import { Chip, createFilterOptions } from '@mui/material';
import State, { STATES } from '../types/States';

export default function StateFilter() {
  const [{ states: origStates }] = useQueryParams();
  const [states, setStates] = useState([]);
  const limitReached = states.length >= 10;

  return (
    <>
      <AutocompleteFilter
        value={states}
        onChange={(e, val) => setStates(val)}
        options={STATES.map((s) => s.abbr)}
        getOptionLabel={(s) => State.toString(s)}
        filterOptions={createFilterOptions({
          stringify: (s) => State.toString(s),
        })}
        limitReached={limitReached}
        placeholder="Enter a state filter by..."
      />

      {states.map((state) => (
        <Chip
          label={state}
          variant={origStates?.includes(state) ? 'contained' : 'outlined'}
          color="primary"
          key={state}
          onClick={() => setStates(states.filter((s) => s !== state))}
          sx={{ mx: 1, mt: 1 }}
        />
      ))}
    </>
  );
}
