import React from 'react';
import { Chip } from '@mui/material';
import { MAJORS } from '../types/options';
import PropTypes from 'prop-types';
import useQueryParams from '../lib/useQueryParams';
import AutocompleteFilter from './AutocompleteFilter';
import { useTranslation } from 'react-i18next';

function MajorFilter({ majors, onChange }) {
  const [{ majors: origMajors }] = useQueryParams();
  const limitReached = majors.length >= 10;
  const { t } = useTranslation('filters');

  return (
    <>
      <AutocompleteFilter
        freeSolo
        value={majors}
        onChange={(e, val) => onChange(val)}
        options={[...MAJORS]}
        limitReached={limitReached}
        placeholder={`${t('enterMajorFilter')}...`}
      />

      {majors.map((major) => (
        <Chip
          label={major}
          variant={origMajors?.includes(major) ? 'contained' : 'outlined'}
          color="primary"
          key={major}
          onClick={() => onChange(majors.filter((m) => m !== major))}
          sx={{ mx: 1, mt: 1 }}
        />
      ))}
    </>
  );
}
export default MajorFilter;

MajorFilter.propTypes = {
  majors: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};

MajorFilter.defaultProps = {
  majors: [],
};
