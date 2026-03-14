import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { fetchAuthProfile } from "@/utils/auth";

export type User = {
  id: number;
  uuid: string;
  full_name: string;
  email: string;
  phone?: string;
  birth_date?: string;
  gender?: string;
  role: "student" | "owner" | "admin";
  academic_year?: string;
  college?: string;
  university?: string;
  is_admin: boolean;
  avatar?: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  refreshProfile: () => Promise<User | null>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  refreshProfile: async () => null,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUserState(JSON.parse(storedUser));
  }, []);

  const setUser = (nextUser: User | null) => {
    setUserState(nextUser);
    if (nextUser) {
      localStorage.setItem("user", JSON.stringify(nextUser));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("uuid");
    }
  };

  const refreshProfile = useCallback(async () => {
    try {
      const profile = await fetchAuthProfile();
      setUser(profile);
      return profile;
    } catch {
      return null;
    }
  }, []);

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser, logout, refreshProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
