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
} from '@mui/material';
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
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
            {deadline?.toLocaleDateString()}
          </Typography>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: '500' }}>
            {organization}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: '500' }}
            gutterBottom>
            {ScholarshipAmount.toString(amount)}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{
              display: '-webkit-box',
              '-webkit-line-clamp': 5,
              lineClamp: 5,
              '-webkit-box-orient': 'vertical',
              overflow: 'hidden',
              whiteSpace: 'pre-line',
              mb: 3,
            }}>
            {description}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {!tags || !tags.length
              ? 'None'
              : tags.map((tag) => (
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
