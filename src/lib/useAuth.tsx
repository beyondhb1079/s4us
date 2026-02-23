// Much credit goes to https://usehooks.com/useAuth/
import {
  useState,
  useEffect,
  createContext,
  ReactNode,
  useContext,
  useMemo,
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
  // Group state to prevent double-rendering!
  const [authState, setAuthState] = useState<Auth>({
    currentUser: undefined,
    claims: {},
  });

  useEffect(() => {
    // Actually capture the unsubscribe function
    const unsubscribe = getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        // Instantly unblock the UI! The Header can immediately paint the Avatar.
        setAuthState({ currentUser: user, claims: {} });

        // Fetch the custom claims in the background
        user
          .getIdTokenResult()
          .then((idTokenResult) => {
            // Use functional state update so we don't accidentally overwrite
            // any other state changes that happened while waiting
            setAuthState((prevState) => ({
              ...prevState,
              claims: idTokenResult.claims,
            }));
          })
          .catch(() => {
            // Silently fail if the token fetch fails (offline, etc)
            // State is already set with the base user!
          });
      } else {
        setAuthState({ currentUser: null, claims: {} });
      }
    });

    // Clean up the listener so you don't leak memory
    return () => unsubscribe();
  }, []);

  // Memoize the value so we don't nuke the app with unnecessary re-renders
  return useMemo(() => authState, [authState]);
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
