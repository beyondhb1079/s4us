// Extracted from ScholarshipForm.tsx — General Info (step 1)
import React from 'react';
import { Grid } from '@mui/material';
import FormikTextField from '../../form/FormikTextField';
import FormikAutocomplete from '../../form/FormikAutocomplete';
import DeadlineField from '../../form/DeadlineField';
import ScholarshipAmountField from '../../form/ScholarshipAmountField';
import { useTranslation } from 'react-i18next';

import { FormikProps } from 'formik';
import ScholarshipData from '../../types/ScholarshipData';

const labelStyle = { marginBottom: 2 };

interface GeneralInfoStepProps {
  formik: FormikProps<ScholarshipData>;
}

export default function GeneralInfoStep({
  formik,
}: GeneralInfoStepProps): React.JSX.Element {
  const { t } = useTranslation(['scholarships', 'common']);

  return (
    <Grid container spacing={3}>
      <Grid
        size={{
          sm: 6,
          xs: 12,
        }}>
        <FormikTextField
          label={`${t('scholarshipName')} *`}
          id="name"
          formik={formik}
          labelStyle={labelStyle}
        />
      </Grid>
      <Grid
        size={{
          sm: 6,
          xs: 12,
        }}>
        <FormikTextField
          label={t('organization')}
          id="organization"
          formik={formik}
          labelStyle={labelStyle}
        />
      </Grid>
      <Grid
        size={{
          sm: 6,
          xs: 12,
        }}>
        <FormikTextField
          label={`${t('scholarshipLink')} *`}
          id="website"
          formik={formik}
          labelStyle={labelStyle}
          placeholder="https://"
          onBlur={(e) => {
            // Automatically prepend https:// to the URL if the protocol is missing
            if (!/https?:\/\//.test(e.target.value)) {
              formik.setFieldValue('website', 'https://' + e.target.value);
            }
          }}
        />
      </Grid>
      <Grid
        size={{
          sm: 6,
        }}>
        <DeadlineField
          label={`${t('deadline')} *`}
          labelStyle={labelStyle}
          formik={formik}
        />
      </Grid>
      <Grid>
        <ScholarshipAmountField formik={formik} labelStyle={labelStyle} />
      </Grid>
      <Grid size={12}>
        <FormikTextField
          label={`${t('description')} *`}
          id="description"
          labelStyle={labelStyle}
          formik={formik}
          minRows={8}
        />
      </Grid>
      <Grid
        size={{
          sm: 6,
          xs: 12,
        }}>
        <FormikAutocomplete
          label={t('tags')}
          id="tags"
          labelStyle={labelStyle}
          freeSolo
          formik={formik}
          options={[]}
          onChange={(e, vals) => {
            const newVals = new Set(
              vals.map((v) => v.toLowerCase().replace(/\s+/g, '-')),
            );
            formik.setFieldValue('tags', Array.from(newVals));
          }}
          placeholder="E.g. athletics, daca, essay, stem, etc."
        />
      </Grid>
    </Grid>
  );
}
