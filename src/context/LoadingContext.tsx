// src/context/LoadingContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type LoadingContextType = {
  isLoading: boolean;
  message?: string;
  showLoading: (msg?: string) => void;
  hideLoading: () => void;
};

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  message: "",
  showLoading: () => {},
  hideLoading: () => {},
});

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>("");

  const showLoading = (msg?: string) => {
    setMessage(msg);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
    setMessage("");
  };

  return (
    <LoadingContext.Provider
      value={{ isLoading, message, showLoading, hideLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
