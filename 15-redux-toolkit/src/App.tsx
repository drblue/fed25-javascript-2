import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import AccountPage from "./features/account/AccountPage";
import TodosPage from "./features/todos/TodosPage";
import Navigation from "./pages/partials/Navigation";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import "./assets/scss/App.scss";

function App() {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/account" element={<AccountPage />} />
				<Route path="/todos" element={<TodosPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>

			<ToastContainer
				closeOnClick
				// limit={5}
				theme="colored"
				// stacked
			/>
		</div>
	);
}

export default App;
