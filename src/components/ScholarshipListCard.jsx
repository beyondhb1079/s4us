import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
  Grid,
} from '@mui/material';
import {
  AttachMoney as AttachMoneyIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import ScholarshipAmount from '../types/ScholarshipAmount';

function ScholarshipListCard({ scholarship }) {
  const { name, amount, deadline, description, organization, tags } =
    scholarship.data;

  return (
    <Card variant="outlined">
      <CardActionArea
        component={Link}
        to={{
          pathname: `/scholarships/${scholarship.id}`,
          state: { scholarship },
        }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: '500' }}>
            {organization}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {name}
          </Typography>

          <Grid container spacing={3} sx={{ mb: 2, ml: -4 }}>
            <Grid item>
              <Box sx={{ display: 'flex' }}>
                <AttachMoneyIcon color="primary" />
                <Typography>{ScholarshipAmount.toString(amount)}</Typography>
              </Box>
            </Grid>

            <Grid item>
              <Box sx={{ display: 'flex' }}>
                <EventIcon color="primary" sx={{ mr: 0.5 }} />
                <Typography>
                  {deadline?.toLocaleDateString() || 'Unknown'}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Typography
            variant="body1"
            color="textSecondary"
            paragraph
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 5,
              lineClamp: 5,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              whiteSpace: 'pre-line',
            }}>
            {description}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {tags &&
              tags.length &&
              tags.map((tag) => (
                <Chip
                  label={tag}
                  variant="outlined"
                  color="primary"
                  sx={{ mr: 2, mb: 2, color: '#000', borderColor: '#3FB1B5' }}
                  key={tag}
                />
              ))}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

ScholarshipListCard.propTypes = {
  scholarship: PropTypes.shape({
    id: PropTypes.string.isRequired,
    data: PropTypes.shape({
      name: PropTypes.string,
      organization: PropTypes.string,
      amount: PropTypes.shape({}),
      description: PropTypes.string,
      deadline: PropTypes.instanceOf(Date),
      website: PropTypes.string,
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
        })
      ),
    }).isRequired,
  }).isRequired,
};

export default ScholarshipListCard;
