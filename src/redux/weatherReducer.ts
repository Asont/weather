import axios from "axios";
import {loadingSetAC} from "./loadingReducer";
import clearIcon from "../assets/icons/Clear.png"
import cloudsIcon from "../assets/icons/Clouds.png"
import rainIcon from "../assets/icons/Rain.png"
import clearBackground from "../assets/img/ClearBackground.jpg"
import rainBackground from "../assets/img/RainBackground.png"
import cloudsBackground from "../assets/img/CloudsBackground.png"
import {TypedDispatch} from "./store";
import { weatherApi} from "../api/weatherApi";

export type StateType = {
    city: string,
    country: string,
    temperatureCurrent: number,
    descriptionCurrent: string,
    temperatureFuture: Array<FutureForecastType>
    temperatureIcons: Array<string>
 //   descriptions: string[]
    backgroundsAndDiscriptions: BackgroundsAndDiscriptionsType[]
}
export type FutureForecastType = {
    temp: number,
    descriptor: string,
}

export type BackgroundsAndDiscriptionsType = {
    image: string,
    color: string,
    icon: string,
}

const initialState = {
    city: "",
    country: "",
    temperatureCurrent: 0,
    descriptionCurrent: "",
    temperatureFuture: [],
    temperatureIcons: [clearIcon, cloudsIcon, rainIcon],
    backgroundsAndDiscriptions: [],
 //   descriptions: ["Thunderstorm", "Drizzle", "Rain", "Snow", "Atmosphere", "Clear", "Clouds"],
}

export type ActionTypeDefaultAPI = DefaultWeatherStateACType | DefaultCityAndCountryACType

export const weatherReducer = (state: StateType = initialState, action: ActionTypeDefaultAPI) => {
    switch (action.type) {
        case 'SET_WEATHER': {
            return {
                ...state,
                temperatureCurrent: action.payload.current.temp,
                descriptionCurrent: action.payload.current.weather[0].main,
                backgroundsAndDiscriptions: [
                    {image: clearBackground, color: "#fdffcd", icon: clearIcon},
                    {image: cloudsBackground, color: "#bae8e8", icon: cloudsIcon},
                    {image: rainBackground, color: "#5585b5", icon: rainIcon},
                ],
                temperatureFuture: [
                    {temp: action.payload.daily[0].temp.day, descriptor: action.payload.daily[0].weather[0].main,},
                    {temp: action.payload.daily[1].temp.day, descriptor: action.payload.daily[1].weather[0].main,},
                    {temp: action.payload.daily[2].temp.day, descriptor: action.payload.daily[2].weather[0].main,},
                    {temp: action.payload.daily[3].temp.day, descriptor: action.payload.daily[3].weather[0].main,},
                    {temp: action.payload.daily[4].temp.day, descriptor: action.payload.daily[4].weather[0].main,},
                    {temp: action.payload.daily[5].temp.day, descriptor: action.payload.daily[5].weather[0].main,},
                ],
            }
        }
        case "SET_COUNTRY_AND_CITY": {
            return {...state, country: action.country, city: action.city}
        }
        default:
            return state
    }
}

export const weatherStateAC = (payload: any) => {
    return {
        type: "SET_WEATHER",
        payload,
    } as const
}

export const CityAndCountryAC = (city: string, country: string) => {
    return {
        type: "SET_COUNTRY_AND_CITY",
        city,
        country,
    } as const
}

type DefaultCityAndCountryACType = ReturnType<typeof CityAndCountryAC>
type DefaultWeatherStateACType = ReturnType<typeof weatherStateAC>
export type RootObject = {
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
	uvi: number;
}
export type WeatherApi = 'OpenWeather' | 'AnotherAPI'
type WeatherPayload = {
    api: WeatherApi
    cache: RootObject
}

export const weatherTC = (payload: WeatherPayload) => (dispatch: TypedDispatch) => {
    if (payload.cache && Object.keys(payload.cache).length === 0) {
        dispatch(loadingSetAC(true))
        weatherApi.getIP()
            .then(async (result) => {
                dispatch(CityAndCountryAC(result.data.city, result.data.country_code))
                sessionStorage.setItem("countryAndCity", JSON.stringify(result.data))
                try {
                    const res = payload.api === 'OpenWeather'
                        ? await weatherApi.getWeather({lat: result.data.latitude, lon: result.data.longitude})
                        : await weatherApi.getWeather({lat: result.data.latitude, lon: result.data.longitude})
                    dispatch(weatherStateAC(res.data))
                    sessionStorage.setItem("cache", JSON.stringify(res.data))
                    dispatch(loadingSetAC(false))
                } catch (error: any) {
                    throw new Error(error)
                }
            }).catch((error:any) => {
            throw new Error(error)
        })
    } else {
        dispatch(loadingSetAC(true))
        let cacheWeather = sessionStorage.getItem("cache")
        let countryAndCityName = sessionStorage.getItem("countryAndCity")
        if (cacheWeather != null) {
            dispatch(weatherStateAC(JSON.parse(cacheWeather)))
        }
        if (countryAndCityName != null) {
            let countryAndCityNameInObject = JSON.parse(countryAndCityName)
            dispatch(CityAndCountryAC(countryAndCityNameInObject.city, countryAndCityNameInObject.country))
        }
        dispatch(loadingSetAC(false))
    }
}

export const searchWeatherTC = (args: {city: string, api: WeatherApi}) => (dispatch: TypedDispatch) => {
    weatherApi.searchLAtAndLonForCity(args.city)
        .then((res) => {
            dispatch(CityAndCountryAC(res.data[0].name, res.data[0].country))
            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${res.data[0].lat}&lon=${res.data[0].lon}&units=metric&appid=97b3012794b85f4b514439ece20456a1`)
                .then((result) => {
                    dispatch(weatherStateAC(result.data))
                }).catch((error:any) => {
                throw new Error(error)
            })
        }).catch((error:any) => {
        throw new Error(error)
    })
}



