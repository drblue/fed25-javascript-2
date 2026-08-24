import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import CounterPage from "./pages/counters/CounterPage";
import ReducerContextCounterPage from "./pages/counters/ReducerContextCounterPage";
import ReducerCounterPage from "./pages/counters/ReducerCounterPage";
import Navigation from "./pages/partials/Navigation";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import "./assets/scss/App.scss";

function App() {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="*" element={<NotFoundPage />} />
				<Route path="/counter" element={<CounterPage />} />
				<Route path="/reducer-counter" element={<ReducerCounterPage />} />
				<Route path="/reducer-context-counter" element={<ReducerContextCounterPage />} />
				<Route path="/" element={<HomePage />} />
			</Routes>

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
