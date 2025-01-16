"use client";
import { AuthProvider } from "./AuthContextsProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
