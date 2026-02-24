// Extracted from ScholarshipForm.tsx — Eligibility Requirements (step 2)
import React from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  FormHelperText,
  createFilterOptions,
} from '@mui/material';
import FormikTextField from '../../form/FormikTextField';
import FormikMultiSelect from '../../form/FormikMultiSelect';
import FormikAutocomplete from '../../form/FormikAutocomplete';
import State, { STATES } from '../../../types/States';
import { GradeLevelInfo } from '../../../types/GradeLevel';
import { EthnicityInfo } from '../../../types/Ethnicity';
import { LintReqsResult } from '../../../lib/lint';
import { useTranslation } from 'react-i18next';
import { School } from '../../../types/options';

import { FormikProps } from 'formik';
import ScholarshipData from '../../types/ScholarshipData';

const labelStyle = { marginBottom: 2 };

interface EligibilityStepProps {
  formik: FormikProps<ScholarshipData>;
  lintIssues: LintReqsResult;
  allMajors: string[];
  allSchools: School[];
  autoFill: () => void;
}

export default function EligibilityStep({
  formik,
  lintIssues,
  allMajors,
  allSchools,
  autoFill,
}: EligibilityStepProps): React.JSX.Element {
  const { t } = useTranslation(['scholarships', 'common']);

  // Initially requirements is null but is set to {} when the "no requirements"
  // checkbox is explicitly set.
  const noReqsChecked = JSON.stringify(formik.values.requirements) === '{}';

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {lintIssues?.messages?.length > 0 && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            <AlertTitle>
              <strong>
                We found the following potential requirements in the
                description. Would you like to populate these values?
              </strong>
            </AlertTitle>
            <Box component="ul">
              {lintIssues.messages?.map((m, i) => (
                <Typography key={i} component="li">
                  {m}
                </Typography>
              ))}
            </Box>
            <Button onClick={autoFill}>Autofill</Button>
          </Alert>
        )}
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={noReqsChecked}
              onChange={() =>
                formik.setFieldValue(
                  'requirements',
                  noReqsChecked ? undefined : {},
                )
              }
              color="primary"
            />
          }
          label={t('noEligibilityReqs').toUpperCase()}
        />
        <FormHelperText error>{formik.errors.requirements}</FormHelperText>
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormikMultiSelect
          disabled={noReqsChecked}
          label={t('grades')}
          id="requirements.grades"
          labelStyle={labelStyle}
          formik={formik}
          options={GradeLevelInfo.values()}
          placeholder={t('noRequirements')}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormikTextField
          id="requirements.gpa"
          type="number"
          disabled={noReqsChecked}
          formik={formik}
          label={t('minGpa')}
          labelStyle={labelStyle}
          placeholder={t('noRequirements')}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormikAutocomplete
          disabled={noReqsChecked}
          label={t('schools')}
          id="requirements.schools"
          labelStyle={labelStyle}
          options={allSchools.map(({ name, state }) => `${name} (${state})`)}
          freeSolo
          formik={formik}
          placeholder={t('noRequirements')}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormikAutocomplete
          disabled={noReqsChecked}
          label={t('states')}
          id="requirements.states"
          labelStyle={labelStyle}
          options={STATES.map((s) => s.abbr)}
          getOptionLabel={(s) => State.toString(s)}
          filterOptions={createFilterOptions({
            stringify: (s) => State.toString(s),
          })}
          formik={formik}
          placeholder={t('noRequirements')}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormikAutocomplete
          disabled={noReqsChecked}
          label={t('majors')}
          id="requirements.majors"
          labelStyle={labelStyle}
          options={allMajors}
          freeSolo
          formik={formik}
          placeholder={t('noRequirements')}
        />
      </Grid>
      <Grid item sm={6} xs={12}>
        <FormikMultiSelect
          disabled={noReqsChecked}
          label={t('ethnicity')}
          id="requirements.ethnicities"
          labelStyle={labelStyle}
          formik={formik}
          options={EthnicityInfo.values()}
          placeholder={t('noRequirements')}
        />
      </Grid>
    </Grid>
  );
}
