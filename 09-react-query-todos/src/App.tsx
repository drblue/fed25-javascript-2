import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import GlobalLoadingSpinner from "./components/spinners/GlobalLoadingSpinner";
import Navigation from "./pages/partials/Navigation";
import CreateTodoPage from "./pages/CreateTodoPage";
import EditTodoPage from "./pages/EditTodoPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import TodoPage from "./pages/TodoPage";
import TodosPage from "./pages/TodosPage";
import "./assets/scss/App.scss";

function App() {
	return (
		<div id="App">
			<Navigation />
			<GlobalLoadingSpinner />

			<Container className="py-3">
				<Routes>
					<Route path="/todos" element={<TodosPage />} />
					<Route path="/todos/create" element={<CreateTodoPage />} />
					<Route path="/todos/:id" element={<TodoPage />} />
					<Route path="/todos/:id/edit" element={<EditTodoPage />} />
					<Route path="/" element={<HomePage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>

			<ReactQueryDevtools />
			<ToastContainer />
		</div>
	);
}

export default App;
