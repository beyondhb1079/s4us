import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Box,
  Typography,
  FormGroup,
} from '@mui/material';
import GradeLevel, { GradeLevelInfo } from '../types/GradeLevel';
import { useTranslation } from 'react-i18next';

interface GGProps {
  title: string;
  gradeGroup: GradeLevel[];
  grades: Set<GradeLevel>;
  toggleSelection: (s: GradeLevel) => void;
  onChange: (a: GradeLevel[]) => void;
}

function GradeGroup({
  title,
  gradeGroup,
  grades,
  toggleSelection,
  onChange,
}: GGProps) {
  let allChecked = gradeGroup.every((grade) => grades.has(grade));

  return (
    <Box sx={{ py: 1 }}>
      <>
        <FormControlLabel
          label={<Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>}
          control={
            <Checkbox
              checked={allChecked}
              onChange={() => {
                gradeGroup.forEach((g) =>
                  allChecked ? grades.delete(g) : grades.add(g),
                );
                allChecked = !allChecked;
                onChange(Array.from(grades));
              }}
            />
          }
        />
      </>

      <FormGroup sx={{ ml: 2 }}>
        {gradeGroup.map((grade) => (
          <FormControlLabel
            key={grade}
            control={
              <Checkbox
                color="primary"
                checked={grades.has(grade)}
                onChange={() => toggleSelection(grade)}
              />
            }
            label={GradeLevelInfo.toString(grade).replace(
              /College|Graduate/gi,
              '',
            )}
          />
        ))}
      </FormGroup>
    </Box>
  );
}

interface GLFProps {
  grades: Set<GradeLevel>;
  onChange: (a: GradeLevel[]) => void;
}

export default function GradeLevelFilter({
  grades = new Set(),
  onChange,
}: GLFProps): JSX.Element {
  const { highSchoolers, undergrads, grads } = GradeLevelInfo;
  const { t } = useTranslation('filters');

  function toggleSelection(grade: GradeLevel) {
    if (grades.has(grade)) {
      grades.delete(grade);
    } else {
      grades.add(grade);
    }
    onChange(Array.from(grades));
  }

  return (
    <FormControl component="fieldset">
      <GradeGroup
        title={t('middleSchool')}
        gradeGroup={[GradeLevel.MiddleSchool]}
        {...{ grades, toggleSelection, onChange }}
      />

      <GradeGroup
        title={t('highSchool')}
        gradeGroup={highSchoolers}
        {...{ grades, toggleSelection, onChange }}
      />

      <GradeGroup
        title={t('collegeUniversity')}
        gradeGroup={undergrads}
        {...{ grades, toggleSelection, onChange }}
      />

      <GradeGroup
        title={t('postGrad')}
        gradeGroup={grads}
        {...{ grades, toggleSelection, onChange }}
      />
    </FormControl>
  );
}
