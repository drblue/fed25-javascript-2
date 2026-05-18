import { createContext } from "react";

interface ThemeContextType {
	isDarkMode: boolean;
	toggleTheme: () => void;
}

// Create the actual context and set the context's default/initial value
export const ThemeContext = createContext<ThemeContextType | null>(null);
