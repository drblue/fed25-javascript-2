import useLocalStorage from "../hooks/useLocalStorage";
import { ThemeContext } from "./ThemeContext";

interface ThemeContextProviderProps {
	children: React.ReactNode;
}

const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
	const [isDarkMode, setIsDarkMode] = useLocalStorage("hn_darkmode", true);
	const isLightMode = !isDarkMode;

	const toggleTheme = () => {
		// Set new state
		setIsDarkMode(!isDarkMode);
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
