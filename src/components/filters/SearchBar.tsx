import React, { useState, useEffect } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import useQueryParams from '../../lib/useQueryParams';

export default function SearchBar(): JSX.Element {
  const { t } = useTranslation('common');
  const [{ q }, setQueryParams] = useQueryParams();
  const [inputValue, setInputValue] = useState(q || '');

  // Sync local state if query params change externally
  useEffect(() => {
    setInputValue(q || '');
  }, [q]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue !== q) {
      setQueryParams({ q: inputValue || undefined });
    }
  };

  const clearSearch = () => {
    setInputValue('');
    setQueryParams({ q: undefined });
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSearch}
      elevation={0}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: { xs: '100%', md: 300 },
        border: '1px solid',
        borderColor: 'grey.300',
        borderRadius: 2,
        mr: { md: 2 },
        mb: { xs: 1, md: 0 },
      }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={t('actions.search') + '...'}
        inputProps={{ 'aria-label': 'search scholarships' }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {inputValue ? (
        <IconButton
          type="button"
          sx={{ p: '5px' }}
          aria-label="clear"
          onClick={clearSearch}>
          <CloseIcon fontSize="small" />
        </IconButton>
      ) : null}
      <IconButton type="submit" sx={{ p: '5px' }} aria-label="search">
        <SearchIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
}
