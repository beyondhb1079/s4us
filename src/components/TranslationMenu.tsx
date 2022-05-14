import { Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
const languages = {
  en: 'English',
  es: 'Español',
};

export default function TranslationMenu({
  anchorEl,
  setAnchorEl,
}: {
  anchorEl: HTMLElement | null;
  setAnchorEl: (e: HTMLElement | null) => void;
}): JSX.Element {
  const { i18n } = useTranslation('common');

  return (
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
  );
}
