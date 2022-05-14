import React from 'react';
import PublicHome from './PublicHome';
import useAuth from '../lib/useAuth';
import { Navigate } from 'react-router-dom';

export default function Home(): JSX.Element {
  const { currentUser: user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : <PublicHome />;
}
