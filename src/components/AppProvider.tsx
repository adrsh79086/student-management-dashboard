"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Login page ko allow karo
    if (pathname === "/") {
      setChecking(false);
      return;
    }

    const isLoggedIn =
      localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      router.replace("/");
      return;
    }

    setChecking(false);
  }, [pathname, router]);

  // Login page ko directly show karo
  if (pathname === "/") {
    return <>{children}</>;
  }

  if (checking) {
    return <div>Checking login...</div>;
  }

  return <>{children}</>;
}