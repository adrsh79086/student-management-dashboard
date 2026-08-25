"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { usePathname, useRouter } from "next/navigation";

type AppContextType = {
  isLoggedIn: boolean;
  adminName: string;
  logout: () => void;
};

const AppContext = createContext<
  AppContextType | undefined
>(undefined);

export function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [adminName, setAdminName] =
    useState("");

  const [checking, setChecking] =
    useState(true);

  useEffect(() => {
    // Login page
    if (pathname === "/") {
      setChecking(false);
      return;
    }

    const loggedIn =
      localStorage.getItem("isLoggedIn") === "true";

    const name =
      localStorage.getItem("adminName") || "";

    setIsLoggedIn(loggedIn);
    setAdminName(name);

    if (!loggedIn) {
      router.replace("/");
      return;
    }

    setChecking(false);
  }, [pathname, router]);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("adminName");

    setIsLoggedIn(false);
    setAdminName("");

    router.replace("/");
  };

  if (pathname === "/") {
    return (
      <AppContext.Provider
        value={{
          isLoggedIn: false,
          adminName: "",
          logout,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }

  if (checking) {
    return <div>Checking login...</div>;
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        adminName,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useAppContext must be used inside AppProvider"
    );
  }

  return context;
}