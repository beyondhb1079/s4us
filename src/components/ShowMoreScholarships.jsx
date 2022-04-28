import { useContext } from 'react';
import ScholarshipsContext from '../models/ScholarshipsContext';
import ShowMoreScholarshipCard from './ShowMoreScholarshipCard';
import Grid from '@mui/material/Grid';

export default function ShowMoreScholarships({ currentId }) {
  const info = useContext(ScholarshipsContext);
  const scholarships = info.scholarships;

  return (
    <Grid container spacing={2} justify="center">
      {scholarships
        .filter((s) => s.id !== currentId)
        .slice(0, 3)
        .map((scholarship, id) => {
          return (
            <Grid key={id} item xs={12} sm={6} md={4}>
              <ShowMoreScholarshipCard scholarship={scholarship} />
            </Grid>
          );
        })}
    </Grid>
  );
}
