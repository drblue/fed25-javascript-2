import type { PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";

const AuthContextProvider = ({ children }: PropsWithChildren) => {
	// Add code for `currentUser`, `login`, `logout` and `signup` and provide them to the children

	return (
		<AuthContext.Provider value={{ }}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider;
