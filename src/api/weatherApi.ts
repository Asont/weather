import axios from "axios";
import {ResponseWeatherType} from "./types/weatherRequsetAPIType";
import {IPType} from "./types/IPRequestType";


export const instanceForIp = axios.create({
    baseURL:'https://geo.ipify.org/api/v2/country,city?apiKey=at_1mKZqQKPkIu5QZNfjiWRwEUvwmEk6&ipAddress=',
})

export const instanceForWeather = axios.create({
    baseURL:'https://api.openweathermap.org/data/2.5/',
})


export const searchIP = {
    getIP(){
        return instanceForIp.get<IPType>("")
    }
}

export const weatherApi = {
    getWeather(result:any){
        return instanceForWeather.get<ResponseWeatherType>(`onecall?lat=${result.data.location.lat}&lon=${result.data.location.lng}&units=metric&appid=97b3012794b85f4b514439ece20456a1`)
    }
}


