"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("wallet_logged_in");
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
}
