import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

interface ThemeContextProviderProps {
	children: React.ReactNode;
}

const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
	const [isDarkMode, setIsDarkMode] = useState(true);
	const isLightMode = !isDarkMode;

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	}

	return (
		<ThemeContext.Provider value={{ isDarkMode, isLightMode, toggleTheme }}>
			{/* ALL MY CHILDREN I WILL PROVIDE THEME CONTEXT TO */}
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeContextProvider;
