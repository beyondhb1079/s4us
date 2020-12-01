import React from 'react';
import { useFormik, getIn } from 'formik';
import { Container, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ScholarshipAmountField from '../components/ScholarshipAmountField';
import DatePicker from '../components/DatePicker';
import validationSchema from '../validation/ValidationSchema';

const useStyles = makeStyles((theme) => ({
  containerStyle: {
    maxWidth: 400,
  },
  fieldStyle: {
    paddingBottom: theme.spacing(1),
  },
}));

function ScholarshipForm() {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      name: '',
      deadline: null,
      description: '',
      amount: {
        type: null,
        minAmount: 0,
        maxAmount: 0,
      },
      website: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
      resetForm();
    },
  });

  function updateAmount(minAmount, maxAmount) {
    formik.setFieldValue('amount.minAmount', minAmount, true);
    formik.setFieldValue('amount.maxAmount', maxAmount, true);
  }

  return (
    <Container maxWidth="md">
      <form className={classes.containerStyle} onSubmit={formik.handleSubmit}>
        <h1>Submit a Scholarship</h1>
        <div>
          <TextField
            className={classes.fieldStyle}
            id="name"
            label="Scholarship Name *"
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={(formik.touched.name && formik.errors.name) || ' '}
            value={formik.values.name}
            onChange={formik.handleChange}
            fullWidth
          />
        </div>

        <DatePicker
          className={classes.fieldStyle}
          id="deadline"
          label="Deadline *"
          error={formik.touched.deadline && Boolean(formik.errors.deadline)}
          helperText={
            (formik.touched.deadline && formik.errors.deadline) || ' '
          }
          value={formik.values.deadline}
          onChange={(date) => formik.setFieldValue('deadline', date, true)}
        />

        <div>
          <TextField
            className={classes.fieldStyle}
            id="description"
            label="Description *"
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={
              (formik.touched.description && formik.errors.description) || ' '
            }
            value={formik.values.description}
            onChange={formik.handleChange}
            multiline
            fullWidth
          />
        </div>

        <div>
          <TextField
            className={classes.fieldStyle}
            id="website"
            label="Website *"
            error={formik.touched.website && Boolean(formik.errors.website)}
            helperText={
              (formik.touched.website && formik.errors.website) || ' '
            }
            value={formik.values.website}
            onChange={formik.handleChange}
            fullWidth
          />
        </div>

        <ScholarshipAmountField
          className={classes.fieldStyle}
          helperText={
            (getIn(formik.touched, 'amount.type') &&
              getIn(formik.errors, 'amount.type')) ||
            getIn(formik.errors, 'amount.minAmount') ||
            getIn(formik.errors, 'amount.maxAmount') ||
            ''
          }
          amountType={formik.values.amount.type}
          minAmount={formik.values.amount.minAmount}
          maxAmount={formik.values.amount.maxAmount}
          onTypeChange={(e) =>
            formik.setFieldValue('amount.type', e.target.value, true)
          }
          updateAmount={updateAmount}
        />

        <div>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={formik.isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
}
export default ScholarshipForm;
