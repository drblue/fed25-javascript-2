import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router";
import Navigation from "./pages/partials/Navigation";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";
import "./assets/scss/App.scss";

function App() {
	return (
		<div id="App">
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
