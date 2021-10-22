import firebase from 'firebase';
import { loadFirestoreRules } from '@firebase/rules-unit-testing';

if (process.env.NODE_ENV !== 'test') {
  throw Error('this file should only be imported in tests');
}

const openRules = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
`;

/**
  Creates and initializes a Firebase app instance for testing.

 * @param options See {@link firebase.initializeApp} for details.
 * @param rules Firestore rules or {@link openRules} by default.
 */
export function initializeTestApp(
  options: {
    apiKey?: string;
    projectId?: string;
    auth?: { uid?: string; email?: string };
  },
  rules: string = openRules
): firebase.app.App {
  const app = firebase.initializeApp(options);
  if (options?.projectId) {
    app.firestore().useEmulator('localhost', 8080);
    loadFirestoreRules({
      projectId: options.projectId,
      rules,
    });
  }

  // Mock current user for the tests
  app.auth = () => {
    let currentUser = options?.auth as firebase.User | null;

    // Need to fake observers for auth state change since some components
    // rely on it.
    let observers: (null | ((a: firebase.User | null) => any))[] = [];
    const setCurrentUser = (user: firebase.User | null) => {
      currentUser = user;
      observers.forEach((o) => !!o && o(user));
    };

    // These methods are faked to facilitate testing.
    // Additional methods can be added or mocked using jest.fn().
    return {
      currentUser,
      onAuthStateChanged: (observer) => {
        const index = observers.length;
        if (typeof observer === 'function') {
          observers.push(observer);
        } else {
          observers.push(observer.next);
        }
        return () => {
          observers[index] = null;
        };
      },
      signOut: () => {
        setCurrentUser(null);
      },
      updateCurrentUser: (user: firebase.User | null) => {
        setCurrentUser(user);
      },
    } as firebase.auth.Auth;
  };
  return app;
}

export { clearFirestoreData } from '@firebase/rules-unit-testing';
