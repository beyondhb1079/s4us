import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Popover,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import GradeLevel from '../types/GradeLevel';
import PropTypes from 'prop-types';

export default function GradeLevelFilter(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openPopover = (event) => setAnchorEl(event.currentTarget);

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
    <>
      <Button
        variant="outlined"
        sx={{ margin: 1, height: (theme) => theme.spacing(4) }}
        onClick={openPopover}
        endIcon={<ArrowDropDownIcon color="primary" />}>
        Grade
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}>
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
      </Popover>
    </>
  );
}

GradeLevelFilter.propTypes = {
  grades: PropTypes.instanceOf(Set),
  changeFn: PropTypes.func.isRequired,
};
GradeLevelFilter.defaultProps = {
  grades: new Set(),
};
