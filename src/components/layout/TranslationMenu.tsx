import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TranslateIcon from '@mui/icons-material/Translate';
import { useState } from 'react';

const languages = {
  en: 'English',
  es: 'Español',
};

export default function TranslationMenu(): JSX.Element {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        aria-label="select language"
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        color="primary"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ mx: 1 }}>
        <TranslateIcon />
      </IconButton>
      <Menu
        open={open}
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
