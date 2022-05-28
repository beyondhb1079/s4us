import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import GradeLevel from '../types/GradeLevel';
import { useTranslation } from 'react-i18next';

interface GGProps {
  title: string;
  gradeGroup: GradeLevel[];
  grades: Set<GradeLevel>;
  toggleSelection: (s: GradeLevel) => void;
}

function GradeGroup({ title, gradeGroup, grades, toggleSelection }: GGProps) {
  return (
    <FormGroup sx={{ py: 1 }}>
      <FormLabel>{title}</FormLabel>
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
          label={GradeLevel.toString(grade).replace(/College|Graduate/gi, '')}
        />
      ))}
    </FormGroup>
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
  const { highSchoolers, undergrads, grads } = GradeLevel;
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
        {...{ grades, toggleSelection }}
      />

      <GradeGroup
        title={t('highSchool')}
        gradeGroup={highSchoolers}
        {...{ grades, toggleSelection }}
      />

      <GradeGroup
        title={t('collegeUniversity')}
        gradeGroup={undergrads}
        {...{ grades, toggleSelection }}
      />

      <GradeGroup
        title={t('postGrad')}
        gradeGroup={grads}
        {...{ grades, toggleSelection }}
      />
    </FormControl>
  );
}
