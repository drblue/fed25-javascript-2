import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import Navigation from "./pages/partials/Navigation";
import EditTodoPage from "./pages/EditTodoPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import TodosPage from "./pages/TodosPage";
import TodoPage from "./pages/TodoPage";
import "./assets/scss/App.scss";

function App() {
	return (
		<div id="App">
			<Navigation />

			<Container className="py-2">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/todos" element={<TodosPage />} />
					<Route path="/todos/:id" element={<TodoPage />} />
					<Route path="/todos/:id/edit" element={<EditTodoPage />} />

					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Container>

			<ToastContainer
				// position="bottom-right"
				// autoClose={3000}  // close automatically after 3 seconds instead of 5
				// autoClose={false}  // close it yourself!
				// pauseOnFocusLoss={false}
				closeOnClick
				// limit={5}
				theme="colored"
				// stacked
			/>
		</div>
	);
}

export default App;
