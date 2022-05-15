import { useTranslation } from 'react-i18next';
import { IconButton, Menu, MenuItem } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import { useState } from 'react';

const languages = {
  en: 'English',
  es: 'Español',
};

export default function TranslationMenu(): JSX.Element {
  const { i18n } = useTranslation('common');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  return (
    <>
      <IconButton
        aria-label="select language"
        color="primary"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ mx: 1 }}>
        <TranslateIcon />
      </IconButton>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}>
        {Object.entries(languages).map(([abbr, lang]) => (
          <MenuItem
            key={lang}
            selected={abbr === i18n.language}
            onClick={() => {
              i18n.changeLanguage(abbr);
              setAnchorEl(null);
            }}>
            {lang}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
