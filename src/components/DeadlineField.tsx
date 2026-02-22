import React, { useMemo } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { InputLabel, SxProps, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import dayjs, { Dayjs } from 'dayjs';

import 'dayjs/locale/es';

interface DeadlineFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik?: any;
  label: string;
  labelStyle?: SxProps<Theme>;
  id?: string;
  // Note: If you pass native Date objects elsewhere, Dayjs handles converting them gracefully!
  value?: Date | null;
  onChange?: (date: Date | null) => void;
}

export default function DeadlineField(props: DeadlineFieldProps): JSX.Element {
  const { label, labelStyle, formik, value, onChange, id } = props;
  const { i18n } = useTranslation();

  const dateValue = formik ? dayjs(formik.values.deadline) : dayjs(value);

  const handleChange = (date: Dayjs | null) => {
    const nativeDate = date ? date.toDate() : null;

    if (formik) {
      formik.setFieldValue('deadline', nativeDate);
    }
    if (onChange) {
      onChange(nativeDate);
    }
  };

  const helperText = formik ? formik.errors.deadline : '';
  const error = formik ? Boolean(formik.errors.deadline) : false;

  const currentLocale = i18n.language === 'es' ? 'es' : 'en';

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={currentLocale}>
      <InputLabel sx={labelStyle}>{label}</InputLabel>
      <MuiDatePicker
        value={dateValue}
        onChange={handleChange}
        slotProps={{
          textField: {
            id,
            variant: 'outlined',
            fullWidth: true,
            helperText: helperText as string,
            error,
          },
        }}
      />
    </LocalizationProvider>
  );
}
