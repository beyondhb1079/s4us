import { Alert, Link, Snackbar } from '@mui/material';
import { useState } from 'react';

export default function OnRenderSnackbar(): JSX.Element | null {
  const match = window.location.hostname.match(/s4us-pr-(\d+)\.onrender\.com/);
  const [open, setOpen] = useState(true);
  if (!match) return null;

  const num = match[1];
  const link = `https://github.com/beyondhb1079/s4us/pull/${num}`;
  return (
    <Snackbar open={open}>
      <Alert onClose={() => setOpen(false)} severity="info">
        This is a preview of <Link href={link}>Pull Request #{num}</Link>
      </Alert>
    </Snackbar>
  );
}
