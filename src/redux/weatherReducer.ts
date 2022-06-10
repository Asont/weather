import axios from "axios";
import {Dispatch} from "redux";
import {loadingSetAC} from "./loadingReducer";
import clearIcon from "../assets/icons/Clear.png"
import cloudsIcon from "../assets/icons/Clouds.png"
import rainIcon from "../assets/icons/Rain.png"
import clearBackground from "../assets/img/ClearBackground.jpg"
import rainBackground from "../assets/img/RainBackground.png"
import cloudsBackground from "../assets/img/CloudsBackground.jpg"
import {TypedDispatch} from "./store";
import {searchIP, weatherApi} from "../api/weatherApi";

type StateType = {
    city: string,
    country: string,
    temperatureCurrent: number,
    descriptionCurrent: string,
    temperatureFuture: Array<FutureForecastType>
    temperatureIcons: Array<string>
    descriptions: string[]
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
    descriptions: ["Thunderstorm", "Drizzle", "Rain", "Snow", "Atmosphere", "Clear", "Clouds"],
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

export const weatherTC = (payload: any) => (dispatch: TypedDispatch) => {
    if (Object.keys(payload).length === 0) {
        dispatch(loadingSetAC(true))
        searchIP.getIP()
            .then((result) => {
                dispatch(CityAndCountryAC(result.data.location.city, result.data.location.country))
                sessionStorage.setItem("countryAndCity", JSON.stringify(result.data.location))
                weatherApi.getWeather(result)
                    .then((res) => {
                        dispatch(weatherStateAC(res.data))
                        sessionStorage.setItem("cache", JSON.stringify(res.data))
                        dispatch(loadingSetAC(false))
                    }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
            console.log(error)
        })
    } else {
        dispatch(loadingSetAC(true))
        let a = sessionStorage.getItem("cache")
        let b = sessionStorage.getItem("countryAndCity")
        if (a != null) {
            dispatch(weatherStateAC(JSON.parse(a)))
        }
        if (b != null) {
            let temp = JSON.parse(b)
            dispatch(CityAndCountryAC(temp.city, temp.country))
        }
        dispatch(loadingSetAC(false))
    }
}

export const searchWeatherTC = (city: string) => (dispatch: TypedDispatch) => {
    axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=97b3012794b85f4b514439ece20456a1`)
        .then((res) => {
            dispatch(CityAndCountryAC(res.data[0].name, res.data[0].country))
            axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${res.data[0].lat}&lon=${res.data[0].lon}&units=metric&appid=97b3012794b85f4b514439ece20456a1`)
                .then((result) => {
                    dispatch(weatherStateAC(result.data))
                }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
        console.log(error)
    })
}



