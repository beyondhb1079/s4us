import { useContext } from 'react';
import ScholarshipsContext from '../models/ScholarshipsContext';
import ShowMoreScholarshipCard from './ShowMoreScholarshipCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export default function ShowMoreScholarships() {
  const { canLoadMore, error, loading, loadMore, scholarships, setFilters } =
    useContext(ScholarshipsContext);

  const j = canLoadMore;
  console.log(j);
  const e = error;
  console.log(e);
  console.log(loading);
  console.log(loadMore);
  console.log(setFilters);

  return (
    <Box>
      <Grid>
        {scholarships.slice(0, 5).map((id, scholarship) => {
          return (
            <Grid key={id} item xs={12} sm={6} md={4}>
              <ShowMoreScholarshipCard scholarship={scholarship} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
