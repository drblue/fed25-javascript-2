import { createContext } from "react";
import type { AuthError, AuthResponse, User } from "@supabase/supabase-js";

export interface AuthContextValue {
	currentUser: User | null;
	login: (email: string, password: string) => Promise<AuthResponse>;
	logout: () => Promise<{ error: AuthError | null; }>;
	signup: (email: string, password: string) => Promise<AuthResponse>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
