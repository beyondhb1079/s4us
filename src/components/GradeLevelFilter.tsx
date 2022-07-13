import React, { useState } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Box,
  Typography,
  FormGroup,
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
  const [allChecked, setAllChecked] = useState(
    gradeGroup.every((grade) => grades.has(grade))
  );

  return (
    <Box sx={{ py: 1 }}>
      <>
        <FormControlLabel
          label={<Typography sx={{ fontWeight: 'bold' }}>{title}</Typography>}
          control={
            <Checkbox
              checked={allChecked}
              onChange={() => {
                if (!allChecked) {
                  gradeGroup.forEach((grade) => grades.add(grade));
                } else {
                  gradeGroup.forEach((grade) => grades.delete(grade));
                }
                setAllChecked(!allChecked);
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
            label={GradeLevel.toString(grade).replace(/College|Graduate/gi, '')}
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
