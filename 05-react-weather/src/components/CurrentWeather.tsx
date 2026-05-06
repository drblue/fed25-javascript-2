import imgBanner from "../assets/images/banner.png";

const CurrentWeather = () => {
	return (
		<div id="current-weather">
			<div className="card">
				<img src={imgBanner} className="card-img-top" alt="Daytime, nighttime, daytime, nighttime" />

				<div className="card-body">
					<h5 className="card-title" id="location">
						<span id="city">CITY</span>, <span id="country">COUNTRY</span>
					</h5>

					<p className="temp">
						<span id="temperature">TEMP</span>
						&deg;C
					</p>

					<p className="humidity">
						<span id="humidity">HUMIDITY</span> % humidity
					</p>

					<p className="wind">
						<span id="windspeed">WIND_SPEED</span> m/s
					</p>

					{/*
					<ul className="conditions">
						<li>
							<img src="" alt="CONDITION_MAIN" title="CONDITION_MAIN">
							<span className="condition-description">CONDITION_DESCRIPTION</span>
						</li>
					</ul>

					<p className="text-muted small">
						<span>
							1970-01-01 13:37:00
						</span>
					</p>
					*/}
				</div>
			</div>
		</div>
	);
};

export default CurrentWeather;
