import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { useFormikContext } from 'formik';

const GRADE_LEVELS = [
  { value: 8, label: '8th Grade' },
  { value: 9, label: 'Freshman (HS)' },
  { value: 10, label: 'Sophomore (HS)' },
  { value: 11, label: 'Junior (HS)' },
  { value: 12, label: 'Senior (HS)' },
  { value: 13, label: 'College Freshman' },
  { value: 14, label: 'College Sophomore' },
  { value: 15, label: 'College Junior' },
  { value: 16, label: 'College Senior' },
  { value: 17, label: 'Graduate Student' },
];

export default function GradeStep() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { values, setFieldValue } = useFormikContext<any>();
  const currentGrades: number[] = values.grades || [];

  const handleToggle = (gradeValue: number) => {
    if (currentGrades.includes(gradeValue)) {
      setFieldValue(
        'grades',
        currentGrades.filter((g) => g !== gradeValue),
      );
    } else {
      setFieldValue(
        'grades',
        [...currentGrades, gradeValue].sort((a, b) => a - b),
      );
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        What is your current education level?
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Select your upcoming or current grade level to see scholarships you are
        eligible for. You can select multiple.
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {GRADE_LEVELS.map((grade) => (
          <Chip
            key={grade.value}
            label={grade.label}
            onClick={() => handleToggle(grade.value)}
            color={currentGrades.includes(grade.value) ? 'primary' : 'default'}
            variant={
              currentGrades.includes(grade.value) ? 'filled' : 'outlined'
            }
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>
    </Box>
  );
}
