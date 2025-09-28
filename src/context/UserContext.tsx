import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

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
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUserState(JSON.parse(storedUser));
  }, []);

  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("uuid");
    }
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
