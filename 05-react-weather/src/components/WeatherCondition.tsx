import type { CurrentWeatherCondition } from "../services/OWMAPI.types";

interface WeatherConditionProps {
	data: CurrentWeatherCondition;
}

const WeatherCondition: React.FC<WeatherConditionProps> = ({ data }) => {
	return (
		<li>
			<img src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`} alt={data.main} title={data.main} />
			<span className="condition-description">{data.description}</span>
		</li>
	)
}

export default WeatherCondition;
