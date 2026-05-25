import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router";
import Navigation from "./pages/partials/Navigation";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductsPage from "./pages/ProductsPage";
import "./assets/scss/App.scss";

function App() {
	return (
		<div id="App">
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/products" element={<ProductsPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>
		</div>
	);
}

export default App;
