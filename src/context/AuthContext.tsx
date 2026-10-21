
"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type UserProfile = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  accessToken: string | null;
  user: UserProfile | null;
  isLoggedIn: boolean;
  isReady: boolean;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("store_access_token");
    setAccessToken(savedToken);

    if (!savedToken) {
      setIsReady(true);
      return;
    }

    async function loadProfile() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!baseUrl) {
          throw new Error("API URL is not configured.");
        }

        const response = await fetch(`${baseUrl}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${savedToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Session expired or profile unavailable.");
        }

        const profile = await response.json();

        if (
          typeof profile.id !== "number" ||
          typeof profile.email !== "string" ||
          typeof profile.role !== "string"
        ) {
          throw new Error("Invalid user profile.");
        }

console.log("Logged-in user role:", profile.role);

        setUser({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role,
        });
      } catch {
        sessionStorage.removeItem("store_access_token");
        setAccessToken(null);
        setUser(null);
      } finally {
        setIsReady(true);
      }
    }

    void loadProfile();
  }, []);

  function login(token: string) {
    sessionStorage.setItem("store_access_token", token);
    setAccessToken(token);
    setUser(null);
    setIsReady(false);

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!baseUrl) {
      sessionStorage.removeItem("store_access_token");
      setAccessToken(null);
      setIsReady(true);
      return;
    }

    void fetch(`${baseUrl}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Could not verify your profile.");
        }

        return response.json();
      })
      .then((profile) => {
        if (
          typeof profile.id !== "number" ||
          typeof profile.email !== "string" ||
          typeof profile.role !== "string"
        ) {
          throw new Error("Invalid user profile.");
        }

        setUser({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role,
        });
      })
      .catch(() => {
        sessionStorage.removeItem("store_access_token");
        setAccessToken(null);
        setUser(null);
      })
      .finally(() => setIsReady(true));
  }

  function logout() {
    sessionStorage.removeItem("store_access_token");
    setAccessToken(null);
    setUser(null);
    setIsReady(true);
  }

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isLoggedIn: Boolean(accessToken && user),
        isReady,
        isAdmin: user?.role === "admin",
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

