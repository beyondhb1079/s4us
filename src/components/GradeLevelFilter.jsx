import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@mui/material';
import GradeLevel from '../types/GradeLevel';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function GradeGroup({ title, gradeGroup, grades, toggleSelection }) {
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

GradeGroup.propTypes = {
  title: PropTypes.string.isRequired,
  gradeGroup: PropTypes.arrayOf(PropTypes.number).isRequired,
  grades: PropTypes.instanceOf(Set),
  toggleSelection: PropTypes.func.isRequired,
};

export default function GradeLevelFilter(props) {
  const { grades, onChange } = props;
  const { highSchoolers, undergrads, grads } = GradeLevel;
  const { t } = useTranslation('filters');

  function toggleSelection(grade) {
    if (grades.has(grade)) {
      grades.delete(grade);
    } else {
      grades.add(grade);
    }
    onChange([...grades]);
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

GradeLevelFilter.propTypes = {
  grades: PropTypes.instanceOf(Set),
  onChange: PropTypes.func.isRequired,
};
GradeLevelFilter.defaultProps = {
  grades: new Set(),
};
