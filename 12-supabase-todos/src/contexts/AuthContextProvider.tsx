import { useEffect, useState, type PropsWithChildren } from "react";
import type { User } from "@supabase/supabase-js";
import Spinner from "react-bootstrap/Spinner";
import { AuthContext } from "./AuthContext";
import { supabase } from "../lib/supabase";

const AuthContextProvider = ({ children }: PropsWithChildren) => {
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const login = (email: string, password: string) => {
		return supabase.auth.signInWithPassword({ email, password });
	}

	const logout = () => {
		return supabase.auth.signOut();
	}

	const signup = (email: string, password: string) => {
		return supabase.auth.signUp({ email, password });
	}

	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			console.log("Auth state changed:", event, session);

			setCurrentUser(session?.user ?? null);
			setIsLoading(false);
		});

		return () => data.subscription.unsubscribe();
	}, []);

	if (isLoading) {
		return (
			<div className="d-flex justify-content-center py-5">
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</div>
		)
	}

	return (
		<AuthContext.Provider value={{ currentUser, login, logout, signup }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider;
