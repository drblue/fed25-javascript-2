import { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import SearchCity from "./components/SearchCity";
import { getCurrentWeather } from "./services/OWMAPI";
import type { CurrentWeatherData } from "./services/OWMAPI.types";
import "./assets/scss/App.scss";

function App() {
	const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);

	const handleSearch = async (location: string) => {
		console.log("Someone wants the current weather in:", location);

		// Call API and ask for weather at `location`
		const data = await getCurrentWeather(location);

		// Update current weather state with the weather at `location`
		setCurrentWeather(data);
	}

	return (
		<div id="app" className="container py-2">
			<SearchCity onSearch={handleSearch} />

			{currentWeather && <CurrentWeather data={currentWeather} />}
		</div>
	);
}

export default App;
