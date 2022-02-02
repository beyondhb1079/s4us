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
  const { grades, changeFn } = props;
  const { highSchoolers, undergrads, grads } = GradeLevel;

  function toggleSelection(grade) {
    if (grades.has(grade)) {
      grades.delete(grade);
    } else {
      grades.add(grade);
    }
    changeFn([...grades]);
  }

  return (
    <FormControl component="fieldset">
      <GradeGroup
        title="Middle School"
        gradeGroup={[GradeLevel.MiddleSchool]}
        {...{ grades, toggleSelection }}
      />

      <GradeGroup
        title="High School"
        gradeGroup={highSchoolers}
        {...{ grades, toggleSelection }}
      />

      <GradeGroup
        title="College/University"
        gradeGroup={undergrads}
        {...{ grades, toggleSelection }}
      />

      <GradeGroup
        title="Postgraduate"
        gradeGroup={grads}
        {...{ grades, toggleSelection }}
      />
    </FormControl>
  );
}

GradeLevelFilter.propTypes = {
  grades: PropTypes.instanceOf(Set),
  changeFn: PropTypes.func.isRequired,
};
GradeLevelFilter.defaultProps = {
  grades: new Set(),
};
