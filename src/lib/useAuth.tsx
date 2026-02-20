// Much credit goes to https://usehooks.com/useAuth/
import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
} from 'react';
import { getAuth, UserInfo } from 'firebase/auth';

interface Auth {
  /** Claims for the current user, if any. */
  claims?: Record<string, unknown>;
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
    undefined as undefined | null | UserInfo,
  );
  const [claims, setClaims] = useState({} as Record<string, unknown>);

  // Subscribe to user on mount. We need to have this called only once so only
  // AuthProvider should use it
  useEffect(
    () =>
      getAuth().onAuthStateChanged((user) => {
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
    [],
  );

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
