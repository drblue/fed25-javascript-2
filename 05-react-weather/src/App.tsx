import { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import SearchCity from "./components/SearchCity";
import { getCurrentWeather } from "./services/OWMAPI";
import type { CurrentWeatherData } from "./services/OWMAPI.types";
import imgLoading from "./assets/images/loading.gif";
import "./assets/scss/App.scss";

function App() {
	const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
	const [error, setError] = useState<string | false>(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = async (location: string) => {
		// set loading state
		setCurrentWeather(null);
		setError(false);
		setIsLoading(true);

		try {
			// Call API and ask for weather at `location`
			const data = await getCurrentWeather(location);

			// Update current weather state with the weather at `location`
			setCurrentWeather(data);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something unexpected happened.");
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div id="app" className="container py-2">
			<SearchCity onSearch={handleSearch} />

			{error && (
				<div className="alert alert-warning" role="alert">{error}</div>
			)}

			{isLoading &&
				<div role="status" className="py-5 w-75">
					<img src={imgLoading} className="img-fluid" alt="Weather reporter in severe storm being hit by a flying fish" />
					<span className="visually-hidden">Loading...</span>
				</div>
			}

			{currentWeather && <CurrentWeather data={currentWeather} />}
		</div>
	);
}

export default App;
