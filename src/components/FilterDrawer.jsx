import React from 'react';
import { Drawer, useMediaQuery } from '@mui/material';
import AmountFilter from './AmountFilter';
import GradeLevelFilter from './GradeLevelFilter';
import MajorFilter from './MajorFilter';
import qParams from '../lib/QueryParams';

function FilterDrawer({ setQueryParam, queryParams, open }) {
  const { minAmount, maxAmount, grades, majors } = queryParams;

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <Drawer
      variant="persistent"
      open={open || isDesktop}
      sx={{
        '& .MuiDrawer-paper': {
          position: 'absolute',
          width: 230,
        },
      }}>
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
    </Drawer>
  );
}

export default FilterDrawer;
