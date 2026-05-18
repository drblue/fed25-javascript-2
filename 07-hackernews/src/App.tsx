import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router";
import useTheme from "./hooks/useTheme";
import Navigation from "./pages/partials/Navigation";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";
import "./assets/scss/App.scss";

function App() {
	const { isDarkMode } = useTheme();

	return (
		<div id="App" className={!isDarkMode ? "bg-white text-dark" : ""}>
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/search" element={<SearchPage />} />
					<Route path="/" element={<HomePage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>
		</div>
	);
}

export default App;
