import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import ScholarshipAmount from '../types/ScholarshipAmount';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';

export default function ShowMoreScholarshipCard({ scholarship }) {
  const scholarshipName = scholarship.data.name;
  const amount = scholarship.data.amount;
  const scholarshipAmount = ScholarshipAmount.toString(amount);
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
        <Typography>
          <AttachMoneyIcon color="primary"></AttachMoneyIcon>
          {scholarshipAmount}
        </Typography>
        <Typography>
          <EventIcon color="primary"></EventIcon>
          {dateDeadline}
        </Typography>
        <Typography>{description}</Typography>
      </CardContent>
    </Card>
  );
}
