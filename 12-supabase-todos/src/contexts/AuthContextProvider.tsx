import { useState, type PropsWithChildren } from "react";
import type { User } from "@supabase/supabase-js";
import { AuthContext } from "./AuthContext";
import { supabase } from "../lib/supabase";

const AuthContextProvider = ({ children }: PropsWithChildren) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	const login = (email: string, password: string) => {
		return supabase.auth.signInWithPassword({ email, password });
	}

	const logout = () => {
		return supabase.auth.signOut();
	}

	const signup = (email: string, password: string) => {
		return supabase.auth.signUp({ email, password });
	}

	return (
		<AuthContext.Provider value={{ currentUser, login, logout, signup }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider;
