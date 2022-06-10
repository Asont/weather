export type ResponseWeatherType = {
	lat: number;
	lon: number;
	timezone: string;
	timezone_offset: number;
	current: RootObjectCurrent;
	minutely: RootObjectMinutely[];
	hourly: RootObjectHourly[];
	daily: RootObjectDaily[];
}
export type RootObjectCurrentWeather = {
	id: number;
	main: string;
	description: string;
	icon: string;
}
export type RootObjectCurrent = {
	dt: number;
	sunrise: number;
	sunset: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: RootObjectCurrentWeather[];
}
export type RootObjectMinutely = {
	dt: number;
	precipitation: number;
}
export type RootObjectHourlyWeather = {
	id: number;
	main: string;
	description: string;
	icon: string;
}
export type RootObjectHourlyRain = {
	"1h": number;
}
export type RootObjectHourly = {
	dt: number;
	temp: number;
	feels_like: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	uvi: number;
	clouds: number;
	visibility: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: RootObjectHourlyWeather[];
	pop: number;
	rain: RootObjectHourlyRain;
}
export type RootObjectDailyTemp = {
	day: number;
	min: number;
	max: number;
	night: number;
	eve: number;
	morn: number;
}
export type RootObjectDailyFeels_like = {
	day: number;
	night: number;
	eve: number;
	morn: number;
}
export type RootObjectDailyWeather = {
	id: number;
	main: string;
	description: string;
	icon: string;
}
export type RootObjectDaily = {
	dt: number;
	sunrise: number;
	sunset: number;
	moonrise: number;
	moonset: number;
	moon_phase: number;
	temp: RootObjectDailyTemp;
	feels_like: RootObjectDailyFeels_like;
	pressure: number;
	humidity: number;
	dew_point: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: RootObjectDailyWeather[];
	clouds: number;
	pop: number;
	rain: number;
	uvi: number;
}