// Much credit goes to https://usehooks.com/useAuth/
import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from 'react';

// Copied from 'firebase' to lazily load it.
interface UserInfo {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  uid: string;
}

interface Auth {
  /** Claims for the current user, if any. */
  claims?: Record<string, any>;
  /** The currently logged in user. May be `undefined` initially. */
  currentUser?: UserInfo | null;
}

const authContext = createContext({} as Auth);

/** Hook to get the auth object. Triggers re-renders on changes. */
export default function useAuth(): Auth {
  return useContext(authContext);
}

// Provider hook that creates auth object and handles state
function useProvideAuth(): Auth {
  const [currentUser, setCurrentUser] = useState(
    undefined as undefined | null | UserInfo
  );
  const [claims, setClaims] = useState({} as Record<string, any>);

  // Subscribe to user on mount. We need to have this called only once so only
  // AuthProvider should use it
  useEffect(() => {
    let cleanup = () => {};
    import('firebase').then((firebase) => {
      cleanup = firebase.default.auth().onAuthStateChanged((user) => {
        setCurrentUser(user);
        if (user) {
          user
            .getIdTokenResult()
            .then((idTokenResult) => setClaims(idTokenResult.claims))
            .catch(() => setClaims({}));
        } else {
          setClaims({});
        }
      });
    });
    return () => cleanup();
  }, []);

  return { currentUser, claims };
}

/** Provider component for the app so that useAuth() can be used in any child component. */
export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
