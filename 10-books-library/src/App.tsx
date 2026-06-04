import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalLoadingSpinner from "./components/spinners/GlobalLoadingSpinner";
import Navigation from "./pages/partials/Navigation";
import AuthorsPage from "./pages/AuthorsPage";
import AuthorPage from "./pages/AuthorPage";
import BooksPage from "./pages/BooksPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import "./assets/scss/App.scss";

function App() {
	return (
		<div id="App">
			<Navigation />
			<GlobalLoadingSpinner />

			<Container className="py-2">
				<Routes>
					<Route path="/" element={<HomePage />} />

					<Route path="/authors" element={<AuthorsPage />} />
					<Route path="/authors/:id" element={<AuthorPage />} />
					<Route path="/books" element={<BooksPage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>

			<ReactQueryDevtools />
			<ToastContainer
				// position="bottom-right"
				// autoClose={3000}  // close automatically after 3 seconds instead of 5
				// autoClose={false}
				// pauseOnFocusLoss={false}  // continue to autoclose even if the user has lost focus
				closeOnClick
				theme="colored"
				limit={5}
				stacked
			/>
		</div>
	);
}

export default App;
