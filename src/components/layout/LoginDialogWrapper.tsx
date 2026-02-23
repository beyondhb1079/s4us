import { lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';

const LoginDialog = lazy(() => import('./LoginDialog'));

export default function LoginDialogWrapper(): JSX.Element | null {
  const location = useLocation();
  const showLoginDialog = (location.state as { showLoginDialog?: boolean })
    ?.showLoginDialog;

  if (!showLoginDialog) return null;

  return (
    <Suspense fallback={null}>
      <LoginDialog />
    </Suspense>
  );
}
