import imgDayBanner from "../assets/images/day.svg";
import imgNightBanner from "../assets/images/night.svg";
import type { CurrentWeatherData } from "../services/OWMAPI.types";
import WeatherCondition from "./WeatherCondition";

interface CurrentWeatherProps {
	data: CurrentWeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
	const freshness = new Date(data.dt * 1000);
	const isDaytime = data.dt > data.sys.sunrise && data.dt < data.sys.sunset;
	const imgBanner = isDaytime ? imgDayBanner : imgNightBanner;
	const imgAltText = isDaytime ? "Clouds on a bright sky" : "Clouds on a dark sky with a mooncrest";

	return (
		<div id="current-weather">
			<div className="card">
				<img src={imgBanner} className="card-img-top" alt={imgAltText} />

				<div className="card-body">
					<h5 className="card-title" id="location">
						<span id="city">{data.name}</span>, <span id="country">{data.sys.country}</span>
					</h5>

					<p className="temp">
						<span id="temperature">{data.main.temp}</span>
						&deg;C
					</p>

					<p className="humidity">
						<span id="humidity">{data.main.humidity}</span> % humidity
					</p>

					<p className="wind">
						<span id="windspeed">{data.wind.speed}</span> m/s
					</p>

					<ul className="conditions">
						{data.weather.map(condition =>
							<WeatherCondition data={condition} key={condition.id} />
						)}
					</ul>

					<p className="text-muted small">
						<span title={freshness.toString()}>
							{freshness.toLocaleDateString()}
							{" "}
							{freshness.toLocaleTimeString()}
						</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default CurrentWeather;
