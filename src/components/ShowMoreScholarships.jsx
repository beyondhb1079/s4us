import { useContext, useRef, useEffect } from 'react';
import ScholarshipsContext from '../models/ScholarshipsContext';
import ShowMoreScholarshipCard from './ShowMoreScholarshipCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useOnScreen from '../lib/useOnScreen';
import { useTranslation } from 'react-i18next';

export default function ShowMoreScholarships() {
  const { canLoadMore, error, loading, loadMore, scholarships, setFilters } =
    useContext(ScholarshipsContext);
  const { t } = useTranslation();

  console.log(scholarships);

  console.log(t);
  let s = scholarships.map((scholarship, id) => ({ [id]: scholarship.data }));
  console.log(s);
  // Automatically load more when the progress is visible
  const progressRef = useRef(null);
  const progressVisible = useOnScreen(progressRef);

  useEffect(() => {
    if (progressVisible && canLoadMore && !loading) {
      loadMore();
    }
  }, [loading, canLoadMore, loadMore, progressVisible]);

  const j = canLoadMore;
  console.log(j);
  const e = error;
  console.log(e);
  console.log(loading);
  console.log(loadMore);
  console.log(setFilters);
  console.log(scholarships);

  return (
    <Box>
      <Grid>
        {scholarships.slice(0, 5).map((scholarship, id) => {
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
