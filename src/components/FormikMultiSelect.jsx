import React from 'react';
import { getIn } from 'formik';
import { InputLabel, Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  textColor: {
    color: theme.palette.grey[500],
    '& .Mui-disabled': {
      WebkitTextFillColor: theme.palette.grey[300],
    },
  },
}));

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
  const classes = useStyles();
  const values = getIn(formik.values, id, []);

  return (
    <>
      <InputLabel className={labelStyle}>{label}</InputLabel>
      <Select
        className={values.length > 0 ? '' : classes.textColor}
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
          <MenuItem key={val} value={val}>
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
  labelStyle: PropTypes.string.isRequired,
  formik: PropTypes.object.isRequired,
  options: PropTypes.objectOf(PropTypes.string).isRequired,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

FormikMultiSelect.defaultProps = {
  disabled: false,
  placeholder: '',
};
