import Container from "react-bootstrap/Container";
import { Route, Routes } from "react-router";
import Navigation from "./pages/partials/Navigation";
import HomePage from "./pages/HomePage";
import TodosPage from "./pages/TodosPage";
import "./assets/scss/App.scss";

function App() {
	return (
		<div id="App">
			<Navigation />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/todos" element={<TodosPage />} />
				</Routes>
			</Container>
		</div>
	);
}

export default App;
