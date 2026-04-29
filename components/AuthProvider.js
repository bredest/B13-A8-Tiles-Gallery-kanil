"use client";
import { useSession } from "@/lib/auth-client";

export default function AuthProvider({ children }) {
  // This component wraps the app and provides auth context via hooks
  return <>{children}</>;
}
