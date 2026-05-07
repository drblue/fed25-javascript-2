import imgBanner from "../assets/images/banner.png";
import type { CurrentWeatherData } from "../services/OWMAPI.types";
import WeatherCondition from "./WeatherCondition";

interface CurrentWeatherProps {
	data: CurrentWeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
	const freshness = new Date(data.dt * 1000);

	return (
		<div id="current-weather">
			<div className="card">
				<img src={imgBanner} className="card-img-top" alt="Daytime, nighttime, daytime, nighttime" />

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
