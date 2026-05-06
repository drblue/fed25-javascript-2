import CurrentWeather from "./components/CurrentWeather";
import SearchCity from "./components/SearchCity";
import "./assets/scss/App.scss";

function App() {
	return (
		<div id="app" className="container py-2">
			<SearchCity />

			<CurrentWeather />
		</div>
	);
}

export default App;
