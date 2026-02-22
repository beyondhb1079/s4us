// Extracted from ScholarshipCard.tsx — helper for eligibility detail rows
import React, { useState } from 'react';
import {
  Button,
  Divider,
  Grid,
  Link as MuiLink,
  Typography,
} from '@mui/material';

const SHOW_MORE_THRESHOLD = 5;

const DetailCardCell = ({
  label,
  values = [],
  t,
}: {
  label: string;
  values?: string[];
  t: (key: string) => string;
}) => {
  const [showAll, setShowAll] = useState(false);
  const shownValues = showAll ? values : values.slice(0, SHOW_MORE_THRESHOLD);
  return (
    <>
      <Grid container justifyContent="space-between">
        <Grid size={12}>
          <Typography>{label}</Typography>
        </Grid>

        <Grid size={12} sx={{ textAlign: { sm: 'right' } }}>
          {values.length === 0
            ? t('common:any')
            : shownValues.map((v) => <Typography key={v}>{v}</Typography>)}
          {values.length > shownValues.length && (
            <MuiLink
              component={Button}
              onClick={() => setShowAll(true)}
              sx={{ p: 0 }}>
              +{values.length - SHOW_MORE_THRESHOLD} {t('common:more')}
            </MuiLink>
          )}
        </Grid>
      </Grid>
      <Divider light sx={{ m: 1.5 }} />
    </>
  );
};
DetailCardCell.defaultProps = { values: [] };

export default DetailCardCell;
