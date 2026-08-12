import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import SignupPage from "./pages/auth/SignupPage";
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

			<>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="*" element={<NotFoundPage />} />

					{/* Auth routes */}
					<Route path="/signup" element={<SignupPage />} />

					{/* Todo routes */}
					<Route path="/todos" element={<TodosPage />} />
					<Route path="/todos/:id" element={<TodoPage />} />
					<Route path="/todos/:id/edit" element={<EditTodoPage />} />
				</Routes>
			</>

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
