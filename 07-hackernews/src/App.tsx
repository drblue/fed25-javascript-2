import clsx from "clsx";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router";
import useTheme from "./hooks/useTheme";
import Navigation from "./pages/partials/Navigation";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import RandomDogPage from "./pages/RandomDogPage";
import SearchPage from "./pages/SearchPage";
import "./assets/scss/App.scss";

function App() {
	const { isLightMode } = useTheme();

	const appCssClasses = clsx({
		"bg-white": isLightMode,
		"text-dark": isLightMode,
	});

	return (
		<div id="App" className={appCssClasses}>
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/random-dog" element={<RandomDogPage />} />
					<Route path="/search" element={<SearchPage />} />
					<Route path="/" element={<HomePage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>
		</div>
	);
}

export default App;
