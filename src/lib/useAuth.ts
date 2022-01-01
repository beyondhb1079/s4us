import { useState, useEffect } from 'react';
import firebase from 'firebase';

// useAuth provides the current Firebase user object.
// If the user is undefined, it's not known whether a user is logged in.
// Otherwise, the null-ness determines whether the user is logged in.
export function useAuth(): firebase.User | null | undefined {
  const [user, setUser] = useState(firebase.auth().currentUser || undefined);
  console.log('subscribed to user changes');
  useEffect(
    () =>
      firebase
        .auth()
        .onAuthStateChanged(
          setUser as (a: firebase.User | null | undefined) => any
        ),
    []
  );
  return user;
}
