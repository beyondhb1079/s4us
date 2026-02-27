import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';

export default function GradeStep() {
  const { t } = useTranslation('onboarding');

  const GRADE_OPTIONS = [
    { value: 8, label: t('gradeStep.levels.grade8') },
    { value: 9, label: t('gradeStep.levels.freshmanHS') },
    { value: 10, label: t('gradeStep.levels.sophomoreHS') },
    { value: 11, label: t('gradeStep.levels.juniorHS') },
    { value: 12, label: t('gradeStep.levels.seniorHS') },
    { value: 13, label: t('gradeStep.levels.collegeFreshman') },
    { value: 14, label: t('gradeStep.levels.collegeSophomore') },
    { value: 15, label: t('gradeStep.levels.collegeJunior') },
    { value: 16, label: t('gradeStep.levels.collegeSenior') },
    { value: 18, label: t('gradeStep.levels.graduateStudent') },
  ];

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
        {t('gradeStep.title')}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {t('gradeStep.description')}
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {GRADE_OPTIONS.map((grade) => (
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
