import Container from "react-bootstrap/Container";
import { Route, Routes, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence } from "motion/react";
import GlobalLoadingSpinner from "./components/spinners/GlobalLoadingSpinner";
import Navigation from "./pages/partials/Navigation";
import AuthorsPage from "./pages/AuthorsPage";
import AuthorPage from "./pages/AuthorPage";
import BooksPage from "./pages/BooksPage";
import EditAuthorPage from "./pages/EditAuthorPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PageTransition from "./ui/PageTransition";
import "./assets/scss/App.scss";

function App() {
	const location = useLocation();

	return (
		<div id="App">
			<Navigation />
			<GlobalLoadingSpinner />

			<Container className="py-2">
				<AnimatePresence mode="wait">
					<Routes location={location} key={location.pathname}>
						<Route path="/" element={
								<PageTransition>
									<HomePage />
								</PageTransition>
							}
						/>

						<Route path="/authors" element={
								<PageTransition>
									<AuthorsPage />
								</PageTransition>
							}
						/>

						<Route path="/authors/:id" element={
								<PageTransition>
									<AuthorPage />
								</PageTransition>
							}
						/>

						<Route path="/authors/:id/edit" element={
								<PageTransition>
									<EditAuthorPage />
								</PageTransition>
							}
						/>

						<Route path="/books" element={
								<PageTransition>
									<BooksPage />
								</PageTransition>
							}
						/>


						<Route path="*" element={
								<PageTransition>
									<NotFoundPage />
								</PageTransition>
							}
						/>
					</Routes>
				</AnimatePresence>
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
