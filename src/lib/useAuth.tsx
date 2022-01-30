// Much credit goes to https://usehooks.com/useAuth/
import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from 'react';
import firebase from 'firebase';

interface Auth {
  /** Claims for the current user, if any. */
  claims?: Record<string, any>;
  /** The current logged in user. May be `undefined` initially. */
  currentUser?: firebase.User | null;
}

const authContext = createContext({} as Auth);

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export default function useAuth(): Auth {
  return useContext(authContext);
}

// Provider hook that creates auth object and handles state
function useProvideAuth(): Auth {
  const [currentUser, setCurrentUser] = useState(
    firebase.auth().currentUser || (undefined as undefined | null)
  );
  const [claims, setClaims] = useState({} as Record<string, any>);

  // Subscribe to user on mount. We need to have this called only once so only
  // AuthProvider should use it
  useEffect(
    () =>
      firebase.auth().onAuthStateChanged((user) => {
        setCurrentUser(user);
        if (user) {
          user
            .getIdTokenResult()
            .then((idTokenResult) => setClaims(idTokenResult.claims))
            .catch(() => setClaims({}));
        } else {
          setClaims({});
        }
      }),
    []
  );

  return { currentUser, claims };
}

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
