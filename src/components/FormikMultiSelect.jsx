import React from 'react';
import { getIn } from 'formik';
import { InputLabel, Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
      width: 250,
    },
  },
};

function FormikMultiSelect(props) {
  const { label, id, labelStyle, formik, options, disabled, placeholder } =
    props;
  const values = getIn(formik.values, id, []);

  return (
    <>
      <InputLabel sx={labelStyle}>{label}</InputLabel>
      <Select
        sx={
          values.length > 0
            ? {}
            : {
                textColor: {
                  color: (theme) => theme.palette.grey[500],
                  '& .Mui-disabled': {
                    WebkitTextFillColor: (theme) => theme.palette.grey[300],
                  },
                },
              }
        }
        disabled={disabled}
        multiple
        fullWidth
        displayEmpty
        id={id}
        variant="outlined"
        value={values}
        onChange={(e) => formik.setFieldValue(id, e.target.value)}
        renderValue={(selected) =>
          selected.map((val) => options[val]).join(', ') || placeholder
        }
        MenuProps={MenuProps}>
        {Object.entries(options).map(([val, stringRep]) => (
          <MenuItem key={val} value={parseInt(val) || val}>
            {stringRep}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

export default FormikMultiSelect;

FormikMultiSelect.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  labelStyle: PropTypes.object.isRequired,
  formik: PropTypes.object.isRequired,
  options: PropTypes.objectOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

FormikMultiSelect.defaultProps = {
  disabled: false,
  placeholder: '',
};
