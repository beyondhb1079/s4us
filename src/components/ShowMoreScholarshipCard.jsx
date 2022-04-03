import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';

export default function ShowMoreScholarshipCard({ scholarship }) {
  const getAmount = (amountData) => {
    if (amountData.min === amountData.max) {
      return amountData.min;
    } else {
      return (
        '$' + amountData.min.toString() + '-' + '$' + amountData.max.toString()
      );
    }
  };

  const scholarshipName = scholarship.data.name;
  const amount = scholarship.data.amount;
  const scholarshipAmount = getAmount(amount);
  const date = new Date(scholarship.data.deadline);
  const dateDeadline =
    date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();

  const description = scholarship.data.description;

  return (
    <Card>
      <CardContent>
        <Typography>
          <b>{scholarshipName}</b>
        </Typography>
        <Typography>{scholarshipAmount}</Typography>
        <Typography>Deadline: {dateDeadline}</Typography>
        <Typography>{description}</Typography>
      </CardContent>
    </Card>
  );
}
