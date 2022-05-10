import React from 'react';
import PublicHome from './PublicHome';
import UserHome from './UserHome';
import useAuth from '../lib/useAuth';

export default function Home(): JSX.Element | string {
  const { currentUser: user } = useAuth();

  if (user === undefined) return '';

  return user ? <UserHome /> : <PublicHome />;
}
