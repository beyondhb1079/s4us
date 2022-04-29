import { useContext } from 'react';
import ScholarshipsContext from '../models/ScholarshipsContext';
import Grid from '@mui/material/Grid';
import ScholarshipCard from './ScholarshipCard';

export default function ShowMoreScholarships({ currentId }) {
  const info = useContext(ScholarshipsContext);
  const scholarships = info.scholarships;

  return (
    <Grid container spacing={2} justify="center">
      {scholarships
        .filter((s) => s.id !== currentId)
        .slice(0, 3)
        .map(({ id, data }) => {
          return (
            <Grid key={id} item xs={12} sm={6} md={4}>
              <ScholarshipCard scholarship={{ id, data }} />
            </Grid>
          );
        })}
    </Grid>
  );
}
