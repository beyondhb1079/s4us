import React, { lazy } from 'react';
import PublicHome from './PublicHome';
import useAuth from '../lib/useAuth';

const UserHome = lazy(() => import('./UserHome'));

export default function Home(): JSX.Element | string {
  const { currentUser: user } = useAuth();

  if (user === undefined) return '';

  return user ? <UserHome /> : <PublicHome />;
}
