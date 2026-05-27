import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router";
import GlobalLoadingSpinner from "./components/spinners/GlobalLoadingSpinner";
import Navigation from "./pages/partials/Navigation";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import RandomCatPage from "./pages/RandomCatPage";
import "./assets/scss/App.scss";

function App() {
	return (
		<div id="App">
			<Navigation />

			<Container className="py-3">
				<GlobalLoadingSpinner />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/products" element={<ProductsPage />} />
					<Route path="/products/:id" element={<ProductPage />} />
					<Route path="/random-cat" element={<RandomCatPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>

			<ReactQueryDevtools />
		</div>
	);
}

export default App;
