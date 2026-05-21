import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

interface ThemeContextProviderProps {
	children: React.ReactNode;
}

const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
	const [isDarkMode, setIsDarkMode] = useState(() => {
		// This will only be executed on the FIRST render when no state exists
		// The return value will be used as the initial value for the state

		console.log("Getting initalState for `isDarkMode` from localStorage `hn_darkmode`...");
		const localStorage_hn_darkmode = window.localStorage.getItem("hn_darkmode") ?? "true";

		return localStorage_hn_darkmode === "true";
	});
	const isLightMode = !isDarkMode;

	const toggleTheme = () => {
		// Set new state
		setIsDarkMode(!isDarkMode);

		// Save new value to localStorage
		// N.B.! `isDarkMode` has not been changed yet as React batches updating of states!
		console.log("💾 Saving theme to localStorage...");
		window.localStorage.setItem("hn_darkmode", String(!isDarkMode));
	}

	console.log("ThemeContextProvider rendering, isDarkMode is:", isDarkMode);

	return (
		<ThemeContext.Provider value={{ isDarkMode, isLightMode, toggleTheme }}>
			{/* ALL MY CHILDREN I WILL PROVIDE THEME CONTEXT TO */}
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeContextProvider;
