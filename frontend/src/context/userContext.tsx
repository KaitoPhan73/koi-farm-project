"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, createContext, useContext } from "react";
import { loadUserFromStorage } from "@/redux/User/userSlice";
import store, { AppDispatch } from "@/redux/store";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any; // Thay thế any bằng interface hoặc type của user nếu có
  accessToken: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null); // Thay thế any bằng interface hoặc type của user nếu có
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const dispatch = store.dispatch as AppDispatch;
    dispatch(loadUserFromStorage());

    // Check localStorage on mount
    const storedUser = localStorage.getItem("user");
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedUser && storedAccessToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedAccessToken);
      setIsAuthenticated(true);
    }

    // Listen to changes in localStorage
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      const storedAccessToken = localStorage.getItem("accessToken");
      if (!storedUser || !storedAccessToken) {
        setUser(null);
        setAccessToken(null);
        setIsAuthenticated(false);
        router.push("/logout");
      } else {
        setUser(JSON.parse(storedUser));
        setAccessToken(storedAccessToken);
        setIsAuthenticated(true);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
