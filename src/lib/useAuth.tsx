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
        try {
          const idTokenResult = await user.getIdTokenResult();
          // Update both at the exact same time
          setAuthState({ currentUser: user, claims: idTokenResult.claims });
        } catch {
          setAuthState({ currentUser: user, claims: {} });
        }
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
