import axios from 'axios'
import { ResponseWeatherType } from './types/weatherRequsetAPIType'
import { IPType } from './types/IPRequestType'

type WeatherAPIArgs = {
    lat: number
    lon: number
}

export const weatherInstance = axios.create({
    baseURL: 'https://api.openweathermap.org/',
    params: {
        appid: '97b3012794b85f4b514439ece20456a1',
        units: 'metric',
    },
})

export const weatherApi = {
    getWeather(args: WeatherAPIArgs) {
        return weatherInstance.get<ResponseWeatherType>(`data/2.5/onecall`, {
            params: {
                ...args,
            },
        })
    },
    searchLAtAndLonForCity(city: string) {
        return weatherInstance.get(`geo/1.0/direct`, {
            params: {
                q: city,
                limit: 5,
            },
        })
    },
    getIP() {
        return axios.get<IPType>('https://ipapi.co/json/')
    },
}
