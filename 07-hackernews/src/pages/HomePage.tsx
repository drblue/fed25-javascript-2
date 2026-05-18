import Button from "react-bootstrap/Button";
import { Link } from "react-router";
import useTheme from "../hooks/useTheme";

const HomePage = () => {
	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<>
			<title>Welcome to Hacker News 🕵🏻‍♂️🤓👀!</title>
			<h1>Welcome to Hacker News 🕵🏻‍♂️🤓👀!</h1>

			<div className="mb-4">
				<p>Theme: {isDarkMode ? "🌖 Dark" : "☀️ Light"}</p>
				<Button
					onClick={toggleTheme}
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
