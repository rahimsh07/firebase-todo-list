import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut as authSignOut } from "firebase/auth";
import { auth } from "./firebase";

const AuthUserContext = createContext({
  authUser: null,
  isLoading: true,
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearState = () => {
    setAuthUser(null);
    setIsLoading(false);
  };

  const authStateChange = async (user) => {
    setIsLoading(true);

    if (!user) {
      clearState()
      return
    }
    setAuthUser({
      uid: user.uid,
      email: user.email,
      username: user.username,
    });
    setIsLoading(false);
  };

  const signOut = () => {
    authSignOut(auth).then(() => clearState());
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChange);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    isLoading,
    setAuthUser,
    signOut,
  }
}

export const AuthUserProvider = ({ children }) => {
    const auth = useFirebaseAuth();
  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
};

export const useAuth = () => useContext(AuthUserContext);