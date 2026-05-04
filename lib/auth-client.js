import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: (typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_BASE_URL) || "https://b13-a8-tiles-gallery-kanil.vercel.app",
});

export const { signIn, signOut, signUp, useSession, updateUser } = authClient;
