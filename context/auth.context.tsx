"use client";
import { useEffect, useState, createContext, useContext } from "react";

type User = {
  id: string;
  username: string;
};

type AuthContextProps = {
  user: User | null;
  isLoading: boolean;
  login(formData: FormData): void;
  logout(): void;
};
const URL = "http://localhost:3000/auth";
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkMe() {
      try {
        const res = await fetch(`${URL}/me`, {
          credentials: "include",
        });
        const { user } = await res.json();
        if (!user) {
          return;
        }
        setUser({
          id: user.sub,
          username: user.username,
        });
      } catch (e) {
        if (e instanceof Error) {
          console.log(e);
        }
      } finally {
        setIsLoading(false);
      }
    }
    checkMe();
  }, []);

  async function login(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    try {
      const res = await fetch(`${URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rawData),
        credentials: "include",
      });
      const { user } = await res.json();
      if (!user) {
        return;
      }
      setUser({
        id: user.sub,
        username: user.username,
      });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    try {
      await fetch(`${URL}/logout`, {
        credentials: "include",
      });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
      }
    } finally {
      setUser(null);
    }
  }
  const authContextValue: AuthContextProps = {
    user,
    isLoading,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
