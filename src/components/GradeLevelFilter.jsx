import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import GradeLevel from '../types/GradeLevel';
import PropTypes from 'prop-types';

export default function GradeLevelFilter(props) {
  const { grades, changeFn } = props;

  function toggleSelection(grade) {
    if (grades.has(grade)) {
      grades.delete(grade);
    } else {
      grades.add(grade);
    }
    changeFn([...grades]);
  }

  return (
    <FormControl component="fieldset" sx={{ padding: 2 }}>
      <FormGroup>
        {Object.entries(GradeLevel.values()).map(([grade, stringRep]) => {
          grade = parseInt(grade);
          return (
            <FormControlLabel
              key={grade}
              control={
                <Checkbox
                  color="primary"
                  checked={grades.has(grade)}
                  onChange={() => toggleSelection(grade)}
                  name="grade"
                />
              }
              label={stringRep}
            />
          );
        })}
      </FormGroup>
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
