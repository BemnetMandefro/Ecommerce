
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type AuthContextType = {
  accessToken: string | null;
  isLoggedIn: boolean;
  isReady: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("store_access_token");
    setAccessToken(savedToken);
    setIsReady(true);
  }, []);

  function login(token: string) {
    sessionStorage.setItem("store_access_token", token);
    setAccessToken(token);
  }

  function logout() {
    sessionStorage.removeItem("store_access_token");
    setAccessToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isLoggedIn: Boolean(accessToken),
        isReady,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
