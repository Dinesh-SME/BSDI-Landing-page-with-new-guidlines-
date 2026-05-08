import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "admin" | "user";

export interface AuthUser {
  role: Role;
  name: string;
}

interface AuthStore {
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}

// Demo-only credentials. Frontend, hardcoded — NOT secure.
export const DEMO_CREDENTIALS: Record<Role, { username: string; password: string; name: string }> = {
  admin: { username: "admin", password: "admin123", name: "Administrator" },
  user: { username: "user", password: "user123", name: "User" },
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: "bsdi-auth" }
  )
);
