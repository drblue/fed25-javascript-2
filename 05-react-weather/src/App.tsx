import { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import SearchCity from "./components/SearchCity";
import { getCurrentWeather } from "./services/OWMAPI";
import type { CurrentWeatherData } from "./services/OWMAPI.types";
import imgLoading from "./assets/images/loading.gif";
import "./assets/scss/App.scss";

function App() {
	const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = async (location: string) => {
		// set loading state
		setIsLoading(true);

		// Call API and ask for weather at `location`
		const data = await getCurrentWeather(location);

		// Update current weather state with the weather at `location`
		setCurrentWeather(data);
		setIsLoading(false);
	}

	return (
		<div id="app" className="container py-2">
			<SearchCity onSearch={handleSearch} />

			{isLoading && <img src={imgLoading} className="img-fluid py-5 w-75" />}

			{currentWeather && <CurrentWeather data={currentWeather} />}
		</div>
	);
}

export default App;
