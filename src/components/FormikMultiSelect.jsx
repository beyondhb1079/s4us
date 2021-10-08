import React from 'react';
import { InputLabel, Select, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textColor: {
    color: theme.palette.grey[500],
  },
}));

const MenuProps = {
  getContentAnchorEl: null, //TODO: remove this when material-ui gets updated to version 5
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  PaperProps: {
    style: {
      maxHeight: 250,
      width: 250,
    },
  },
};

function FormikMultiSelect(props) {
  const { label, id, labelStyle, formik, options, placeholder } = props;
  const classes = useStyles();

  return (
    <>
      <InputLabel className={labelStyle}>{label}</InputLabel>
      <Select
        className={
          formik.values.requirements[id].length === 0 ? classes.textColor : ''
        }
        multiple
        fullWidth
        displayEmpty
        id={id}
        variant="outlined"
        value={formik.values.requirements[id]}
        onChange={(e) =>
          formik.setFieldValue(
            `requirements.${id}`,
            e.target.value,
            /* shouldValidate = */ false
          )
        }
        renderValue={(selected) => selected.join(', ') || placeholder}
        MenuProps={MenuProps}
      >
        {Object.entries(options).map(([name, value]) => (
          <MenuItem key={value} value={value}>
            {name}
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
  placeholder: PropTypes.string,
};
FormikMultiSelect.defaultProps = {
  placeholder: '',
};
