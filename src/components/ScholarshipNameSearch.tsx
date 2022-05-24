import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search as SearchIcon } from '@mui/icons-material';
import Scholarships from '../models/Scholarships';
import ScholarshipCard from './ScholarshipCard';
import Model from '../models/base/Model';
import ScholarshipData from '../types/ScholarshipData';

export default function ScholarshipNameSearch(): JSX.Element {
  const { t } = useTranslation(['scholarships']);
  const [namePrefix, setNamePrefix] = useState('');
  const [nameResults, setNameResults] = useState({
    scholarships: [] as Model<ScholarshipData>[],
    loading: false,
    error: undefined,
  });

  return (
    <>
      <Box display="flex">
        <TextField
          id="query"
          variant="outlined"
          sx={{ width: '100%', mb: 2 }}
          placeholder={t('enterScholarshipName')}
          onChange={(e) => setNamePrefix(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onKeyPress={(e: any) => {
            if (e.key === 'Enter' && e.target.value.length > 0) {
              const newNamePrefix = e.target.value;
              Scholarships.list({
                limit: 2,
                showExpired: true,
                namePrefix: newNamePrefix,
                sortField: 'name',
              })
                .then(({ results: scholarships }) =>
                  setNameResults({
                    scholarships,
                    loading: false,
                    error: undefined,
                  })
                )
                .catch((error) =>
                  setNameResults({
                    scholarships: [],
                    loading: false,
                    error,
                  })
                )
                .finally(() => setNamePrefix(newNamePrefix));
            }
          }}
        />
      </Box>
      <Box>
        {nameResults?.scholarships?.slice(0, 1).map(({ id, data }) => (
          <ScholarshipCard key={id} scholarship={{ id, data }} style="glance" />
        ))}
        <Typography>
          {nameResults.error ||
            (() => {
              if (nameResults.scholarships.length === 0) {
                const noResults = t('noResultsToDisplay');
                const tip = namePrefix ? t('tryVariations') : t('pressEnter');
                return `${noResults} ${tip}`;
              } else if (nameResults.scholarships.length === 1) {
                return '';
              } else {
                return t('multipleMatches');
              }
            })()}
        </Typography>
      </Box>
    </>
  );
}
