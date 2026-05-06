/**
 * Types for Open Weather Map API
 *
 * <https://openweathermap.org/current>
 */

export interface CurrentWeatherCondition {
	id: number;
	main: string;
	description: string;
	icon: string;
}

export interface CurrentWeatherData {
	coord: {
		lon: number;
		lat: number;
	};
	weather: CurrentWeatherCondition[];
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
		sea_level: number;
		grnd_level: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
		gust: number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
}
