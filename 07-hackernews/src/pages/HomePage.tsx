import { useContext } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router";
import { ThemeContext } from "../contexts/ThemeContext";

const HomePage = () => {
	const themeContext = useContext(ThemeContext);
	if (!themeContext) {
		throw new Error("Trying to use ThemeContext outside of ThemeContextProvider");
	}

	return (
		<>
			<title>Welcome to Hacker News 🕵🏻‍♂️🤓👀!</title>
			<h1>Welcome to Hacker News 🕵🏻‍♂️🤓👀!</h1>

			<div className="mb-4">
				<p>Theme: {themeContext.isDarkMode ? "🌖 Dark" : "☀️ Light"}</p>
				<Button
					onClick={themeContext.toggleTheme}
					variant="secondary"
				>Toggle theme</Button>
			</div>

			<Link className="btn btn-primary" to="/search">
				Use the Search, you must!
			</Link>
		</>
	)
}

export default HomePage;
