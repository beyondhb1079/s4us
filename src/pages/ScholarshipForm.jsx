import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik, getIn } from 'formik';
import firebase from 'firebase';
import { Container, Button, TextField, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import ScholarshipAmountField from '../components/ScholarshipAmountField';
import DatePicker from '../components/DatePicker';
import validationSchema from '../validation/ValidationSchema';
import Scholarships from '../models/Scholarships';

const useStyles = makeStyles((theme) => ({
  containerStyle: {
    maxWidth: 400,
  },
  fieldStyle: {
    paddingBottom: theme.spacing(1),
  },
  submitStyle: {
    marginBottom: theme.spacing(2),
  },
}));

function ScholarshipForm() {
  const classes = useStyles();
  const [submissionAlert, setSubmissionAlert] = useState(null);
  const user = firebase.auth().currentUser;

  const formik = useFormik({
    initialValues: {
      name: '',
      deadline: null,
      description: '',
      amount: {
        type: null,
        min: 0,
        max: 0,
      },
      website: '',
    },
    validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      Scholarships.save({
        ...values,
        author: {
          id: user?.uid,
          email: user?.email,
        },
      })
        .then((scholarship) => {
          setSubmissionAlert(
            <Alert
              severity="success"
              action={
                <>
                  <Button
                    color="inherit"
                    size="medium"
                    component={Link}
                    to={`/scholarships/${scholarship.id}`}>
                    VIEW
                  </Button>
                  <IconButton
                    size="medium"
                    color="inhert"
                    onClick={() => setSubmissionAlert(null)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </>
              }>
              <AlertTitle>Success</AlertTitle>
              {`${scholarship.data.name} submitted successfully.`}
            </Alert>
          );
          resetForm();
        })
        .catch((error) =>
          setSubmissionAlert(
            <Alert severity="error" onClose={() => setSubmissionAlert(null)}>
              <AlertTitle>Error</AlertTitle>
              {error.toString()}
            </Alert>
          )
        )
        .finally(() => setSubmitting(false));
    },
  });

  function updateAmount(min, max) {
    formik.setFieldValue('amount.min', min, true);
    formik.setFieldValue('amount.max', max, true);
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
            getIn(formik.errors, 'amount.min') ||
            getIn(formik.errors, 'amount.max') ||
            ''
          }
          amountType={formik.values.amount.type}
          minAmount={formik.values.amount.min}
          maxAmount={formik.values.amount.max}
          onTypeChange={(e) =>
            formik.setFieldValue('amount.type', e.target.value, true)
          }
          updateAmount={updateAmount}
        />

        <div>
          <Button
            className={classes.submitStyle}
            variant="contained"
            color="primary"
            type="submit"
            disabled={formik.isSubmitting}>
            Submit
          </Button>
        </div>
      </form>
      {submissionAlert}
    </Container>
  );
}
export default ScholarshipForm;
